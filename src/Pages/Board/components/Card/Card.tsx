import { Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { CardSettingsDropdownMenu } from './CardSettingsDropdow';
import { CardTitle } from './CardTitle';

type CardItem = {
    content: string;
    index: number;
    id: string;
    onDeleteCard: (cardId: string) => void;
};

export const Card: React.FC<CardItem> = ({
    content,
    index,
    id,
    onDeleteCard,
}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(content);
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className='flex w-full h-9 items-center gap-[10px] px-[10px] py-[2%] relative bg-slate-100 rounded-[7px] overflow-hidden border-black cursor-pointer '
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <CardTitle
                        title={title}
                        setTitle={setTitle}
                        cardId={id}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                    ></CardTitle>
                    <div
                        className={`absolute p-[2%] top-0 right-0 transition-opacity duration-100 ${
                            isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <CardSettingsDropdownMenu
                            cardId={id}
                            onDeleteCard={onDeleteCard}
                            setIsInputActive={() => setIsEditing(true)}
                        />
                    </div>
                </div>
            )}
        </Draggable>
    );
};
