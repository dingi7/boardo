import { useContext } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { BoardHeader } from './_components/board-navbar';
import { List } from './List/List';
import { createCard, deleteCard, updateBoard } from '../../api/requests';
import { dataBaseList } from '../../Interfaces/IDatabase';
import { successNotification } from '../../util/notificationHandler';
import { AddListPlaceholder } from './List/AddListPlaceholder';
import { Loading } from './_components/loading';
import { BoardContext } from './BoardContext';

export const Board = (): JSX.Element => {
    const context = useContext(BoardContext);

    if (!context) {
        throw new Error('Board context is not available');
    }
    const {
        boardId,
        boardInfo,
        setBoardInfo,
        lists,
        setLists,
        backgroundUrl,
        setBackgroundUrl,
        loading,
        setLoading,
    } = context;

    const onDeleteCard = async (cardId: string) => {
        await deleteCard(cardId, boardId!);
        setLists((prev) => {
            if (!prev) return null;
            return prev.map((list) => ({
                ...list,
                cards: list.cards.filter((card) => card._id !== cardId),
            }));
        });
        successNotification('Card deleted successfully');
    };

    const onCardAdd = async (listId: string, name: string) => {
        const card = await createCard(listId, name);
        successNotification('Card created successfully');
        setLists((prev) => {
            if (!prev) return null;
            return prev.map((list) =>
                list._id === card.list
                    ? { ...list, cards: [...list.cards, card] }
                    : list
            );
        });
    };

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
            return updateBoard(boardInfo!._id, boardInfo!.name, newColumnOrder);
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
            return updateBoard(boardInfo!._id, boardInfo!.name, newState);
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
        return updateBoard(boardInfo!._id, boardInfo!.name, newState);
    };

    if (loading) return <Loading></Loading>;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div
                className='flex flex-col w-screen overflow-y-auto h-screen bg-slate-800 overflow-hidden'
                style={{
                    backgroundImage: `url('${backgroundUrl}')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <BoardHeader
                    boardName={boardInfo?.name || ''}
                    setBoardName={(name: string) =>
                        setBoardInfo({ ...boardInfo!, name })
                    }
                    setBackgroundUrl={setBackgroundUrl}
                    backgroundUrl={backgroundUrl}
                />
                <Droppable
                    droppableId='allcolumns'
                    direction='horizontal'
                    type='column'
                >
                    {(provided) => (
                        <div
                            className={`flex flex-row mt-[1%] p-[1%] gap-[2%] w-full px-[2%] mx-auto h-screen overflow-auto pr-[10%] pretty-scrollBar`}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {lists?.map((data, index) => (
                                <List
                                    key={data._id}
                                    id={data._id}
                                    title={data.name}
                                    cards={data.cards}
                                    index={index}
                                    onCardAdd={onCardAdd}
                                    onDeleteCard={onDeleteCard}
                                />
                            ))}
                            <AddListPlaceholder></AddListPlaceholder>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};
