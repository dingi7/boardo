import { Draggable } from '@hello-pangea/dnd';
import { Pencil } from 'lucide-react';
import { Button } from '../../../Components/ui/button';
import { useState } from 'react';

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
    const [isHovered, setIsHovered] = useState(false);
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="flex w-full h-9 items-center gap-[10px] px-[10px] py-[6px] relative bg-slate-100 rounded-[7px] overflow-hidden border-black cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-slate-900 text-[16px] tracking-[0] leading-[normal] whitespace-nowrap ">
                        {content}
                    </div>
                    <div
                        className={` absolute top-0 right-0 transition-opacity duration-100 ${
                            isHovered ? 'opacity-100' : 'opacity-0'
                        } mb-10`}
                    >
                        <Button
                            className=" border-r-8"
                            onClick={async () => onDeleteCard(id)}
                        >
                            <Pencil />
                        </Button>
                    </div>
                </div>
            )}
        </Draggable>
    );
};
