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

export const BoardSettingsDropdownMenu = ({ boardId, setBackgroundUrl }: { boardId: string, setBackgroundUrl: (bgUrl: string) => void }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreHorizontal className='on:hover: cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <BackgroundPicker boardId={boardId} setBackgroundUrl={setBackgroundUrl} />
                    <DeleteHandler boardId={boardId} />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
