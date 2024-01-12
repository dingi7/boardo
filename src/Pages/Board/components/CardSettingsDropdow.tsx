import { MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from 'src/Components/dropdown';
import { BackgroundPicker } from './BackgroundPicker';
import { DeleteHandler } from './DeleteHandler';
import { BoardContext } from '../contexts/BoardContextProvider';
import { useContext } from 'react';

export const CardSettingsDropdownMenu = ({ cardId, onDeleteCard }: { cardId: string, onDeleteCard? : any }) => {
    const context = useContext(BoardContext);
    const {  } = context!;
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreHorizontal className='h-6 w-6 on:hover:bg-slate-200 cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>Card Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {/* <BackgroundPicker boardId={"boardId"} setBackgroundUrl={() => {}} /> */}
                    <DeleteHandler itemId={cardId} option='card' deleteCard={onDeleteCard}/>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
