import { Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { CardSettingsDropdownMenu } from './CardSettingsDropdow';
import { CardTitle } from './CardTitle';
import {
    AlertCircle,
    AlertOctagon,
    AlertTriangle,
    Calendar,
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from 'src/Components/ui/tooltip';

type CardItem = {
    content: string;
    index: number;
    id: string;
    onDeleteCard: (cardId: string) => void;
    storedPriority: string;
    storedDueDate?: Date;
};

export const Card: React.FC<CardItem> = ({
    content,
    index,
    id,
    onDeleteCard,
    storedPriority,
    storedDueDate,
}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(content);
    const [priority, setPriority] = useState<string>(
        storedPriority || 'Normal'
    );
    const [date, setDate] = useState<Date | undefined>(
        storedDueDate ? new Date(storedDueDate) : undefined
    );
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
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className='flex items-center gap-[10px]'>
                                    {priority === 'Urgent' ? (
                                        <AlertTriangle
                                            color='red'
                                            className='h-5 w-5'
                                        />
                                    ) : priority === 'Important' ? (
                                        <AlertOctagon
                                            color='#FF8200'
                                            className='h-5 w-5 '
                                        />
                                    ) : priority === 'Normal' ? (
                                        <AlertCircle className='h-5 w-5' />
                                    ) : null}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>This card has priority of {priority}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    {date && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className='flex items-center gap-[10px]'>
                                        {date! > new Date() ? (
                                            <Calendar
                                                color='green'
                                                className='h-5 w-5'
                                            />
                                        ) : (
                                            <Calendar
                                                color='red'
                                                className='h-5 w-5'
                                            />
                                        )}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        This card's due date is{' '}
                                        {date?.toLocaleString() ||
                                            'Not asigned'}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
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
                            priority={priority}
                            setPriority={setPriority}
                            date={date}
                            setDate={setDate}
                        />
                    </div>
                </div>
            )}
        </Draggable>
    );
};
