import {
    MoreHorizontal, Settings,
    Trash
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from 'src/Components/dropdown';
import { BackgroundPicker } from './backgroundPicker';

export const BoardSettingsDropdownMenu = () => {
    const deleteBoard = async() => {
        // ask for user confirmation
        // delete board
        // redirect user to dashboard

        
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {/* <DropdownMenuItem>
                        <User className='mr-2 h-4 w-4' />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>  */}
                    {/* <DropdownMenuItem>
                        <Settings className='mr-2 h-4 w-4' />
                        <span>Change background</span>
                    </DropdownMenuItem> */}
                    <BackgroundPicker />
                    <DropdownMenuItem>
                        <Trash className='mr-2 h-4 w-4' />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
