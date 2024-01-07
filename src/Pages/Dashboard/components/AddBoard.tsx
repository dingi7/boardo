import { HelpCircle } from 'lucide-react';
import { FormPopover } from '../../../Components/form/form-popover';
import { Hint } from '../../../Components/hint';

export const AddBoard = ({}) => {
    return (
        <FormPopover sideOffset={10} side='right'>
            <div
                role='button'
                className=' bg-slate-200 aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
            >
                <p className='text-sm'>Create new board</p>
                <span className='text-xs'>{`3 remaining`}</span>
                <Hint
                    sideOffset={40}
                    description={`
                Workspaces can have up to 5 open boards.
              `}
                >
                    <HelpCircle className='absolute bottom-2 right-2 h-[14px] w-[14px]' />
                </Hint>
            </div>
        </FormPopover>
    );
};
