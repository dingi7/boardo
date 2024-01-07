import { X } from "lucide-react";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { Button } from "../ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./popover";
import { FormPicker } from "./form-picker";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: 'left' | 'right' | 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
}

export const FormPopover = ({
    children,
    side = 'right',
    align,
    sideOffset = 0,
}: FormPopoverProps) => {

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent
                align={align}
                className='w-80 pt-3 bg-slate-200'
                side={side}
                sideOffset={sideOffset}
            >
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
                    Create board
                </div>
                <PopoverClose asChild>
                    <Button
                        className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
                        variant='ghost'
                    >
                        <X className='h-4 w-4' />
                    </Button>
                </PopoverClose>
                <form onSubmit={() => {}} className='space-y-4'>
                    <div className='space-y-4'>
                        <FormPicker id='image'/>
                        <FormInput
                            id='title'
                            label='Board title'
                            type='text'
                        />
                    </div>
                    <FormSubmit className='w-full'>Create</FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
