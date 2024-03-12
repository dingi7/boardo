import * as React from 'react';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from 'src/Components/select';

export const PrioritySelect = ({
    priority,
    setPriority,
}: {
    priority: string;
    setPriority: (priority: string) => void;
}) => {
    return (
        <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className='w-[100%]'>
                <SelectValue placeholder={priority} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='Urgent'>Urgent</SelectItem>
                <SelectItem value='Important'>Important</SelectItem>
                <SelectItem value='Normal'>Normal</SelectItem>
            </SelectContent>
        </Select>
    );
};
