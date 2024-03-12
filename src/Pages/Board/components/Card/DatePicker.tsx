'use client';

import * as React from 'react';
import { format } from 'date-fns';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from 'src/Components/form/popover';
import { cn } from 'src/util/utils';
import { Button } from 'src/Components/ui/button';
import { Calendar } from 'src/Components/ui/calendar';
import { CalendarIcon } from 'lucide-react';

export const DatePicker = ({
    storedDueDate,
    setCardDueDate,
}: {
    storedDueDate: Date | undefined;
    setCardDueDate: any;
}): JSX.Element => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-[100%] justify-start text-left font-normal',
                        !storedDueDate && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {storedDueDate ? (
                        format(storedDueDate, 'PPP')
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <Calendar
                    mode='single'
                    selected={storedDueDate}
                    onSelect={setCardDueDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};
