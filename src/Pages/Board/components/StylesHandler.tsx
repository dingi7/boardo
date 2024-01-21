import { Paintbrush } from 'lucide-react';
import { useState } from 'react';

import {
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from 'src/Components/dropdown';

export const StylesHandler = ({
    setBackgroundColor,
}: {
    setBackgroundColor: (color: string) => void;
}): JSX.Element => {
    return (
        <>
            {/*  */}
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <Paintbrush className='mr-2 h-4 w-4' />
                    <span>Change style</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem
                            onClick={() => setBackgroundColor('bg-red-500')}
                        >
                            Red
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setBackgroundColor('bg-blue-500')}
                        
                        >Blue</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setBackgroundColor('bg-yellow-500')}
                        
                        >Yellow</DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
        </>
    );
};
