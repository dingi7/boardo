import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
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

interface BoardCard {
    key: string;
    id: string;
    name: string;
    items: CardItem[];
}

interface CardProps {
    id: string;
    index: number;
    card: BoardCard;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const DragableCard: React.FC<CardProps> = ({ id, index, moveCard, card }) => {
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: any, monitor) {
            if (item.index !== index) {
                moveCard(item.index, index);
                item.index = index;
            }
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0 : 1 }} data-handler-id={handlerId}>
            <List id={id} name={card.name} initialItems={card.items} setIsOpen={() => { }} />
        </div>
    );
};

export default DragableCard;
