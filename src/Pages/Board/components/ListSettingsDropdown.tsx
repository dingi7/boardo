import { MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from 'src/Components/dropdown';
import { BackgroundPicker } from './backgroundPicker';
import { DeleteHandler } from './DeleteHandler';
import { BoardContext } from '../contexts/BoardContextProvider';
import { useContext } from 'react';

export const ListSettingsDropdownMenu = ({ listId }: { listId: string, onDeleteCard? : any }) => {
    const context = useContext(BoardContext);
    const { setLists } = context!;
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreHorizontal className='h-6 w-6 on:hover:bg-slate-200 cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>List Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {/* <BackgroundPicker boardId={"boardId"} setBackgroundUrl={() => {}} /> */}
                    <DeleteHandler itemId={listId} option='list' setLists={setLists} />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
