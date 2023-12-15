import { useEffect, useState } from 'react';
import { BoardHeader } from './_components/board-navbar';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { List } from './List/List';
import {
    createCard,
    deleteCard,
    getBoardById,
    updateBoard,
} from '../../api/requests';
import { useParams } from 'react-router-dom';
import { dataBaseList } from '../../Interfaces/IDatabase';
import { IBoardProps } from '../../Interfaces/IBoard';
import React from 'react';
import { successNotification } from '../../util/notificationHandler';

export const Board = (): JSX.Element => {
    const [backgroundUrl, setBackgroundUrl] = useState<string>("");
    const onDeleteCard = async (cardId: string) => {
        await deleteCard(cardId, boardId!);
        setLists((prev) => {
            const newState = prev!.map((list: dataBaseList) => {
                const newCards = list.cards.filter(
                    (card: any) => card._id !== cardId
                );
                list.cards = newCards;
                return list;
            });
            return newState;
        });
        successNotification('Card deleted successfully');
    };
    const { boardId } = useParams<{ boardId: string }>();
    const [boardInfo, setBoardInfo] = useState<IBoardProps>({
        _id: boardId || '',
        name: '',
        lists: [] as dataBaseList[],
        backgroundUrl: ""
    });
    const [boardName, setBoardName] = useState<string>('');
    const onCardAdd = async (listId: string, name: string) => {
        const card = await createCard(listId, name);
        successNotification('Card created successfully');
        setLists((prev) => {
            const newState = prev!.map((list: dataBaseList) => {
                if (list._id === card.list) {
                    list.cards.push(card);
                    return list;
                } else {
                    return list;
                }
            });
            return newState;
        });
    };

    useEffect(() => {
        const getBoard = async () => {
            const data = await getBoardById(boardId!);
            setBoardInfo({
                _id: boardId || '',
                name: data.name,
                lists: data.lists,
                backgroundUrl: data.backgroundUrl
            });
            setBoardName(data.name);
            setLists(data.lists);
            if (data.backgroundUrl) {
                setBackgroundUrl(data.backgroundUrl)
            }
        };
        getBoard();
    }, [boardId]);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = [...lists!];

            const [removed] = newColumnOrder.splice(source.index, 1);

            newColumnOrder.splice(destination.index, 0, removed);

            setLists(newColumnOrder);
            return updateBoard(boardInfo._id, boardInfo.name, newColumnOrder);
        }

        const start = lists!.find(
            (list: dataBaseList) => list._id === source.droppableId
        );
        const finish = lists!.find(
            (list: dataBaseList) => list._id === destination.droppableId
        );
        if (start === finish) {
            const newArr = Array.from(start!.cards);
            const [removed] = newArr.splice(source.index, 1);
            newArr.splice(destination.index, 0, removed);
            if (start) {
                start.cards = newArr;
            }
            const newState = lists!.map((list: dataBaseList) => {
                if (list._id === start?._id) {
                    return start;
                } else {
                    return list;
                }
            });

            setLists(newState);
            return updateBoard(boardInfo._id, boardInfo.name, newState);
        }

        const startArr = Array.from(start!.cards);
        const [removed] = startArr.splice(source.index, 1);
        const finishArr = Array.from(finish!.cards);

        finishArr.splice(destination.index, 0, removed);

        const updatedStartList = {
            ...start,
            cards: startArr,
        };
        const updatedFinishList = {
            ...finish,
            cards: finishArr,
        };

        const newState = lists!.map((list: any) => {
            if (list._id === updatedStartList?._id) {
                return updatedStartList;
            } else if (list._id === updatedFinishList?._id) {
                return updatedFinishList;
            } else {
                return list;
            }
        });

        setLists(newState);
        return updateBoard(boardInfo._id, boardInfo.name, newState);
    };

    const [lists, setLists] = useState<dataBaseList[]>();

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-col w-screen overflow-y-auto h-screen bg-slate-800"
            style={{ 
                backgroundImage: `url('${backgroundUrl}')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}
            >
                {/* change bg */}
                <BoardHeader
                    boardName={boardName}
                    setBoardName={setBoardName}
                    setBackgroundUrl={setBackgroundUrl}
                    backgroundUrl={backgroundUrl}
                />
                <Droppable
                    droppableId="allcolumns"
                    direction="horizontal"
                    type="column"
                >
                    {(provided) => (
                        <div
                            className={`flex flex-row mt-[1%] ml-10 p-[1%] gap-[2%] w-full overflow-auto`}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {lists
                                ? lists.map(
                                      (data: dataBaseList, index: number) => {
                                          return (
                                              <List
                                                  key={data._id}
                                                  id={data._id}
                                                  title={data.name}
                                                  cards={data.cards}
                                                  index={index}
                                                  onCardAdd={onCardAdd}
                                                  onDeleteCard={onDeleteCard}
                                              ></List>
                                          );
                                      }
                                  )
                                : null}
                            {/* <ListPlaceholder/>, */}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};
