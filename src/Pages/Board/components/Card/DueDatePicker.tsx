import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'src/Components/Toaster/use-toast';
import { DropdownMenuItem } from 'src/Components/dropdown';
import { Button } from 'src/Components/ui/button';
import { Calendar } from 'src/Components/ui/calendar';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from 'src/Components/ui/dialog';

export const DueDatePicker = ({
    dueDate,
    setCardDueDate,
}: {
    dueDate: Date | undefined;
    setCardDueDate: (dueDate: Date) => void;
}): JSX.Element => {
    const [date, setDate] = useState<Date | undefined>(dueDate);
    const handleSave = async (e: any) => {
        if (!date) {
            e.preventDefault();
            toast({
                title: 'Failed to set due date',
                variant: 'destructive',
            });
            return;
        }
        setCardDueDate(date);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.preventDefault();
                    }}
                >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    <span>Pick a date</span>
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className='w-auto  h-auto'>
                <DialogHeader>
                    <DialogTitle>Choose a date</DialogTitle>
                    <DialogDescription>
                        Choose your the date due for this card
                    </DialogDescription>
                </DialogHeader>
                <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    className='rounded-md border'
                ></Calendar>
                <DialogFooter className='sm:justify-center'>
                    <DialogClose asChild>
                        <Button
                            type='submit'
                            size={'lg'}
                            className='color-black'
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
