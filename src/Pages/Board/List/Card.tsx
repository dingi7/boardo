import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../../Components/DragableComponent/ItemTypes';

type CardProps = {
    task: string;
    index: number;
    id: string;
    moveTask: (dragIndex: number, hoverIndex: number) => void;
};

export const Card: React.FC<CardProps> = ({ task, index, id, moveTask }) => {
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.TASK,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: any, monitor) {
            if (item.index !== index) {
                moveTask(item.index, index);
                item.index = index;
            }
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK,
        item: () => {
            return { id, index };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            className="flex w-[355px] h-9 items-center gap-[10px] px-[10px] py-[6px] relative flex-[0_0_auto] bg-slate-100 rounded-[7px] overflow-hidden border-black hover:border-2 cursor-pointer"
            ref={(node) => drag(drop(node))}
            style={{ opacity: isDragging ? 0 : 1 }}
            data-handler-id={handlerId}
        >
            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-slate-900 text-[16px] tracking-[0] leading-[normal] whitespace-nowrap ">
                {task}
            </div>
        </div>
    );
};
