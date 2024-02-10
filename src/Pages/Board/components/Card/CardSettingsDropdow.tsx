import { Edit, MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from 'src/Components/dropdown';
import { DeleteHandler } from '../DeleteHandler';
import { BoardContext } from '../../contexts/BoardContextProvider';
import { useContext } from 'react';
import { PriorityDropdown } from './PriorityDropdown';
import { changeCardPriority, setCardDueDate } from 'src/api/requests';
import { DueDatePicker } from './DueDatePicker';

export const CardSettingsDropdownMenu = ({
    cardId,
    onDeleteCard,
    setIsInputActive,
    priority,
    setPriority,
    date,
    setDate,
}: {
    cardId: string;
    onDeleteCard?: any;
    setIsInputActive: (active: boolean) => void;
    priority: string;
    setPriority: (priority: string) => void;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}) => {
    const context = useContext(BoardContext);
    if (!context) throw new Error('Board context is not available');
    const { boardInfo } = context!;

    // const [date, setDate] = useState<Date | undefined>(new Date());

    const handleChangePriority = async (priority: string) => {
        setPriority(priority);
        await changeCardPriority(cardId, boardInfo!.owner, priority);
    };

    const handleSetDueDate = async (dueDate: Date) => {
        setDate(dueDate);
        await setCardDueDate(cardId, boardInfo!.owner, dueDate);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreHorizontal className='h-6 w-6 on:hover:bg-slate-200 cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>Card Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setIsInputActive(true)}>
                        <Edit className='mr-2 h-4 w-4' />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <PriorityDropdown
                        setPriority={handleChangePriority}
                    ></PriorityDropdown>
                    <DueDatePicker
                        dueDate={date}
                        setCardDueDate={handleSetDueDate}
                    />
                    <DeleteHandler
                        itemId={cardId}
                        option='card'
                        deleteCard={onDeleteCard}
                    />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
