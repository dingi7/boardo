import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { X } from 'lucide-react';
import { DropdownMenuSeparator } from 'src/Components/dropdown';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from 'src/Components/ui/card';
import { INotification } from 'src/Interfaces/INotification';

export const Notification = ({
    _id,
    isRead,
    title,
    description,
    markCurrentNotificationAsRead,
    createdAt,
  }: INotification) => {
    const createdDate = new Date(createdAt);
  
    return (
        <div className='w-full'>
            <DropdownMenuSeparator />
      <Card
        className={`relative border-x-0 border-y-4 p-2  w-full max-w-full ${
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
  
        <div className='flex gap-2'>
          <span className='font-semibold text-md'>{title}</span>
          <span className='opacity-80'>{createdDate.toLocaleDateString()}</span>
        </div>
  
        <div className='w-full h-16 max-w-full overflow-hidden' style={{width: '100%'}}>
          <p style={{width: '100%'}}>{description}</p>
        </div>
      </Card>
      </div>
    );
  };
  
