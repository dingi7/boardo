import { MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from 'src/Components/dropdown';
import { StylesHandler } from './StylesHandler';
import { DeleteHandler } from './DeleteHandler';
import { BoardContext } from '../contexts/BoardContextProvider';
import { useContext, useState } from 'react';


export const  ListSettingsDropdownMenu = ({ listId }: { listId: string, onDeleteCard? : any }) => {
    const context = useContext(BoardContext);
    const { setLists } = context!;

    const [isStylesDisplayOpen, setIsStylesDisplayOpen] = useState<boolean>(false)
    
    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreHorizontal className='h-6 w-6 on:hover:bg-slate-200 cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>List Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DeleteHandler itemId={listId} option='list' setLists={setLists}/>
                    <StylesHandler showStylesDialog={() => setIsStylesDisplayOpen(true)}/>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    );
};
