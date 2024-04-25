import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { X } from 'lucide-react';
import { DropdownMenuSeparator } from 'src/Components/dropdown';
import { Card, CardContent, CardHeader } from 'src/Components/ui/card';
import { INotification } from 'src/Interfaces/INotification';

export const Notification = ({
  _id,
  isRead,
  title,
  description,
  markCurrentNotificationAsRead,
  createdAt
}: INotification) => {
    const createdDate = new Date(createdAt);
  return (
    <div className='w-full'>
      <DropdownMenuSeparator />
      <Card
        className={`relative border-x-0 border-y-4 p-2 ${
          isRead ? 'opacity-60' : ''
        }`}
      >
        {!isRead && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className='absolute right-2 top-2'
                onClick={() => markCurrentNotificationAsRead(_id)}
              >
                <X />
              </TooltipTrigger>

              <TooltipContent>
                <p className='p-2 rounded-md bg-slate-100'>Mark as read</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <CardHeader className='flex flex-row items-center gap-2 px-2 py-0'>
          <div className='flex gap-2'>
              <span className='font-semibold text-md'>{title}</span>
              <span className='opacity-80'>{createdDate.toLocaleDateString()}</span>
          </div>
        </CardHeader>
        <CardContent className='px-2 py-0 w-36'>
          <div className='text-sm max-w-40 w-36'>
            <p className='break-words  max-w-[260px]'>{description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
