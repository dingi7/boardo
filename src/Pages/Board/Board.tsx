import React from 'react';
import { DndProvider, useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IBoardProps } from '../../Interfaces/IBoard';
import { BoardHeader } from './Header/BoardHeader';
import { BoardSidebar } from './Sidebar/BoardSidebar';

export const Board = (): JSX.Element => {
    interface DraggableListProps {
        id: string;
        name: string;
        initialItems: Array<any>; // Define a more specific type if possible
        index: number;
    }

    const DraggableList: React.FC<DraggableListProps> = ({ id, name, initialItems, index }) => {
        const [{ isDragging }, dragRef] = useDrag(() => ({
            type: 'LIST',
            item: { id, index },
            collect: (monitor: DragSourceMonitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }));

        return (
            <div
                ref={dragRef}
                style={{ opacity: isDragging ? 0.5 : 1 }}
                className="list-draggable"
            >
                {/* Render the list content here */}
                {name}
            </div>
        );
    };

    const DroppableArea: React.FC = () => {
        const [, dropRef] = useDrop(() => ({
            accept: 'LIST',
            drop: (item: { id: string, index: number }, monitor: DropTargetMonitor) => {
                // Handle the drop logic here
                console.log(`Dropped item id: ${item.id}`);
            },
        }));

        return (
            <div ref={dropRef} className="droppable-area">
                {/* Droppable content goes here */}
            </div>
        );
    };

    const lists = [
        {
            key: '123',
            id: '123',
            name: 'Test',
            initialItems: [
                { id: '1', name: 'test' },
                { id: '2', name: 'test test' },
                { id: '3', name: 'test test test' },
            ],
        },
        {
            key: '22',
            id: '22',
            name: 'Test1',
            initialItems: [{ id: '4', name: 'test' }],
        },
        {
            key: '13323',
            id: '13323',
            name: 'Test2',
            initialItems: [{ id: '5', name: 'test' }],
        },
    ];

    const { boardName, boardId }: IBoardProps = {
        boardName: 'test',
        boardId: 'test',
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="bg-[#172b4d] flex flex-row justify-center w-full overflow-y-auto">
                <div className="flex flex-row bg-[#172b4d] overflow-hidden w-full h-screen relative">
                    <BoardSidebar />
                    <BoardHeader boardName={boardName} boardId={boardId} />
                    <DroppableArea />
                    <div className="flex flex-row mt-[4%] p-[1%] gap-[2%] w-full overflow-auto">
                        {lists.map((list, index) => (
                            <DraggableList
                                key={list.id}
                                id={list.id}
                                name={list.name}
                                initialItems={list.initialItems}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};
