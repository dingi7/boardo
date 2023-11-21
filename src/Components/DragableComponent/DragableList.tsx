import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { List } from '../../Pages/Board/List/List';
import { ItemTypes } from './ItemTypes';

interface CheckboxElement {
    // Define the shape of your checkbox element
}

interface CardItem {
    id: string;
    name: string;
    checkboxElements: CheckboxElement[];
    color: string;
}

interface BoardList {
    key: string;
    id: string;
    name: string;
    items: CardItem[];
}

interface ListProps {
    id: string;
    index: number;
    list: BoardList;
    OpenModal: () => void;
    moveList: (dragIndex: number, hoverIndex: number) => void;
}

const DragableList: React.FC<ListProps> = ({ id, index, moveList, list, OpenModal }) => {
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.LIST,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: any, monitor) {
            if (item.index !== index) {
                moveList(item.index, index);
                item.index = index;
            }
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.LIST,
        item: () => {
            return { id, index };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0 : 1 }} data-handler-id={handlerId}>
            <List id={id} name={list.name} initialItems={list.items} setIsOpen={OpenModal} />
        </div>
    );
};

export default DragableList;
