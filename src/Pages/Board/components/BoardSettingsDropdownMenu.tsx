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

export const BoardSettingsDropdownMenu = ({ boardId }: { boardId: string }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <BackgroundPicker />
                    <DeleteHandler boardId={boardId} />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
