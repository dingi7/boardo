import { Draggable } from '@hello-pangea/dnd';

type CardItem = {
    content: string;
    index: number;
    id: string;
};

export const Card: React.FC<CardItem> = ({ content, index, id }) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="flex w-[355px] h-9 items-center gap-[10px] px-[10px] py-[6px] relative flex-[0_0_auto] bg-slate-100 rounded-[7px] overflow-hidden border-black hover:border-2 cursor-pointer"
                >
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-slate-900 text-[16px] tracking-[0] leading-[normal] whitespace-nowrap ">
                        {content}
                    </div>
                </div>
            )}
        </Draggable>
    );
};
