import { Brain, MoreHorizontal } from 'lucide-react';
import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'src/Components/select';
import { Button } from 'src/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from 'src/Components/ui/dialog';
import { Input } from 'src/Components/ui/input';
import { Label } from 'src/Components/ui/label';
import { Textarea } from 'src/Components/ui/textarea';
import { DueDatePicker } from './DueDatePicker';
import { Calendar } from 'src/Components/ui/calendar';
import { PriorityDropdown } from './PriorityDropdown';

interface SettingsCardModalProps {
    title: string;
    cardId: string;
    onDeleteCard?: any;
    setIsInputActive: (active: boolean) => void;
    priority: string;
    setPriority: (priority: string) => void;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

const SettingsCardModal: React.FC<SettingsCardModalProps> = ({
    title,
    cardId,
    onDeleteCard,
    setIsInputActive,
    priority,
    setPriority,
    date,
    setDate,
}) => {
    return (
        <Dialog>
            <DialogTrigger>
                <MoreHorizontal className='on:hover: cursor-pointer' />
            </DialogTrigger>

            <DialogContent className='sm:max-w-[525px]'>
                <DialogHeader>
                    <DialogTitle>Edit Card</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Edit the card's description, due date, and priority.
                </DialogDescription>
                <div className='flex flex-col'>
                    <div>
                        <Label>Title</Label>
                        <Input type='text' value={title} />
                    </div>
                    <div>
                        <Label>Descriptionn</Label>
                        <div className='flex items-center gap-3'>
                            <Textarea
                                placeholder='Type your description here.'
                                className='w-[100%] resize-none h-[150px]'
                            ></Textarea>
                            <Button
                                variant={'ghost'}
                                className='w-[20%] h-[150px]'
                            >
                                <Brain></Brain>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Label>Due date</Label>
                        {/* <Input type='date' value={date} /> */}
                        <Calendar
                            mode='single'
                            selected={date}
                            onSelect={setDate}
                            className='rounded-md border'
                        ></Calendar>
                    </div>
                    <div>
                        <Label>Priority</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder={priority} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='urgent'>Urgent</SelectItem>
                                <SelectItem value='important'>
                                    Important
                                </SelectItem>
                                <SelectItem value='normal'>Normal</SelectItem>
                            </SelectContent>
                        </Select>
                        
                    </div>
                </div>
                <DialogFooter>
                    <Button type='submit'>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsCardModal;
