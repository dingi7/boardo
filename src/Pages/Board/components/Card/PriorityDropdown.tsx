import { AlertCircle, AlertOctagon, AlertTriangle } from 'lucide-react';

import {
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from 'src/Components/dropdown';

export const PriorityDropdown = ({
    setPriority,
}: {
    setPriority: (priority: string) => void;
}): JSX.Element => {
    return (
        <>
            {/*  */}
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <AlertCircle className='mr-2 h-4 w-4' />
                    <span>Change priority</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => setPriority('Urgent')}>
                            <AlertTriangle
                                color='red'
                                className='mr-2 h-4 w-4'
                            />
                            <span>Urgent</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setPriority('Important')}
                        >
                            <AlertOctagon
                                color='#FF8200'
                                className='mr-2 h-4 w-4'
                            />
                            <span>Important</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPriority('Normal')}>
                            <AlertCircle className='mr-2 h-4 w-4' />
                            <span>Regular</span>
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
        </>
    );
};
