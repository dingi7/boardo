import { useEffect, useState } from 'react';
import { BoardHeader } from './Header/BoardHeader';
import { ListItem } from '../../Interfaces/IList';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { List } from './List/List';
import { getBoardById, updateBoard } from '../../api/requests';
import { useParams } from 'react-router-dom';

export const Board = (): JSX.Element => {
    const { boardId } = useParams<{ boardId: string }>();
    const [boardInfo, setBoardInfo] = useState({
        id: boardId || '',
        name: '',
        lists: [],
    });

    useEffect(() => {
        const getBoard = async () => {
            const data = await getBoardById(boardId!);
            console.log(data);

            setBoardInfo({
                id: boardId || '',
                name: data.name,
                lists: data.lists,
            });
            setLists(data.lists);
            console.log(orderedLists);
        };
        getBoard();
    }, [boardId]);

    const onDragEnd = (result: any) => {
        const { destination, source, draggableId, type } = result;

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
            return updateBoard(boardInfo.id, boardInfo.name, newColumnOrder);
        }

        const start = lists!.find(
            (list: any) => list.id === source.droppableId
        );
        const finish = lists!.find(
            (list: any) => list.id === destination.droppableId
        );
        if (start === finish) {
            const newArr = Array.from(start!.items);
            const [removed] = newArr.splice(source.index, 1);
            newArr.splice(destination.index, 0, removed);

            const updatedList = {
                ...start,
                items: newArr,
            };
            const newState = lists!.map((list: any) => {
                if (list.id === updatedList.id) {
                    return updatedList;
                } else {
                    return list;
                }
            });

            setLists(newState);
            return updateBoard(boardInfo.id, boardInfo.name, newState);
        }

        const startArr = Array.from(start!.items);
        const [removed] = startArr.splice(source.index, 1);
        const finishArr = Array.from(finish!.items);
        finishArr.splice(destination.index, 0, removed);

        const updatedStartList = {
            ...start,
            items: startArr,
        };
        const updatedFinishList = {
            ...finish,
            items: finishArr,
        };

        const newState = lists!.map((list: any) => {
            if (list.id === updatedStartList.id) {
                return updatedStartList;
            } else if (list.id === updatedFinishList.id) {
                return updatedFinishList;
            } else {
                return list;
            }
        });
        setLists(newState);
        return updateBoard(boardInfo.id, boardInfo.name, newState);
    };

    const [lists, setLists] = useState<ListItem[]>();

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="bg-[url('https://images.unsplash.com/photo-1698471058817-a280ddf07704?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] flex flex-col w-screen overflow-y-auto h-screen">
                {/* change bg */}
                <BoardHeader boardName={boardInfo.name} />
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
                                ? lists.map((data: any, index: number) => {
                                      return (
                                          <List
                                              key={data.list._id}
                                              id={data.list._id}
                                              title={data.list.name}
                                              items={data.list.items}
                                              index={index}
                                          ></List>
                                      );
                                  })
                                : null}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};
