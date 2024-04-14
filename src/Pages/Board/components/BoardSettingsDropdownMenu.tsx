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
import { SaveTemplate } from './saveTemplate';

export const BoardSettingsDropdownMenu = ({
    boardId,
    setBackgroundUrl,
}: {
    boardId: string;
    setBackgroundUrl: (bgUrl: string) => void;
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreHorizontal className='on:hover: cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <BackgroundPicker
                        boardId={boardId}
                        setBackgroundUrl={setBackgroundUrl}
                    />
                    <SaveTemplate boardId={boardId} />
                    <DeleteHandler
                        itemId={boardId}
                        option='board'
                        setLists={() => {}}
                    />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
