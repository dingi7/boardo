import { useState } from 'react';
import { IBoardProps } from '../../Interfaces/IBoard';
import { BoardHeader } from './Header/BoardHeader';
import { ListItem } from '../../Interfaces/IList';
import { DragDropContext } from '@hello-pangea/dnd';
import { List } from './List/List';

export const Board = (): JSX.Element => {
    const { boardName, boardId }: IBoardProps = {
        boardName: 'test',
        boardId: 'test',
    };

    const onDragEnd = (result: any) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = lists.find((list: any) => list.id === source.droppableId);
        const finish = lists.find(
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
            const newState = lists.map((list: any) => {
                if (list.id === updatedList.id) {
                    return updatedList;
                } else {
                    return list;
                }
            });

            setLists(newState);
            return;
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

        const newState = lists.map((list: any) => {
            if (list.id === updatedStartList.id) {
                return updatedStartList;
            } else if (list.id === updatedFinishList.id) {
                return updatedFinishList;
            } else {
                return list;
            }
        });
        setLists(newState);
        console.log(newState);
        
    };

    const [lists, setLists] = useState<ListItem[]>([
        {
            key: '123',
            id: '123',
            title: 'To do',
            items: [
                {
                    id: '1',
                    content: 'Feed The dog',
                },
                {
                    id: '2',
                    content: 'feed dan',
                },
                {
                    id: '3',
                    content: 'eat',
                },
            ],
        },
        {
            key: '456',
            id: '456',
            title: 'In progress',
            items: [
                // {
                //     id: '1',
                //     content: 'test',
                // },
                // {
                //     id: '2',
                //     content: 'test test',
                // },
                // {
                //     id: '3',
                //     content: 'test test test',
                // },
            ],
        },
        {
            key: '22',
            id: '22',
            title: 'Done ',
            items: [
                // {
                //     id: '1',
                //     content: 'test',
                // },
                // {
                //     id: '2',
                //     content: 'test test',
                // },
                // {
                //     id: '3',
                //     content: 'test test test',
                // },
            ],
        },
    ]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="bg-[url('https://images.unsplash.com/photo-1698471058817-a280ddf07704?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] flex flex-col w-screen overflow-y-auto h-screen">
                {/* change bg */}
                <BoardHeader boardName={boardName} boardId={boardId} />
                <div
                    className={`flex flex-row mt-[1%] ml-10 p-[1%] gap-[2%] w-full overflow-auto`}
                >
                    {lists.map((list: any, index: number) => {
                        return (
                            <List
                                key={list.id}
                                id={list.id}
                                title={list.title}
                                items={list.items}
                            ></List>
                        );
                    })}
                </div>
            </div>
        </DragDropContext>
    );
};
