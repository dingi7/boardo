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
import { useContext, useState } from 'react';
import { PriorityDropdown } from './PriorityDropdown';
import { changeCardPriority } from 'src/api/requests';

export const CardSettingsDropdownMenu = ({
    cardId,
    onDeleteCard,
    setIsInputActive,
    priority,
    setPriority,
}: {
    cardId: string;
    onDeleteCard?: any;
    setIsInputActive: (active: boolean) => void;
    priority: string;
    setPriority: (priority: string) => void;
}) => {
    const context = useContext(BoardContext);
    if (!context) throw new Error('Board context is not available');
    const { boardInfo } = context!;

    const handleChangePriority = async (priority: string) => {
        setPriority(priority);
        await changeCardPriority(cardId, boardInfo!.owner, priority);
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
