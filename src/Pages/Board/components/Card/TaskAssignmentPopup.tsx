'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/Components/form/popover';
import { cn } from 'src/util/utils';
import { Button } from 'src/Components/ui/button';
import { UserPlus } from 'lucide-react';
import MultipleCombobox from './multipleCombobox';
import { IUserData } from 'src/Interfaces/IUserData';
import { IAssignment } from 'src/Interfaces/IAssignment';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from 'src/Components/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'src/Components/dropdown';

export const TaskAssignmentPopup = ({
  assignments,
  occupiedMembers,
  availableMembers,
  assingUser,
  removeUserAssignment,
}: {
  occupiedMembers: Array<IUserData>;
  availableMembers: Array<IUserData>;
  assignments: Array<IAssignment>;
  removeUserAssignment: (user: IUserData) => void;
  assingUser: (user: IUserData) => void;
}): JSX.Element => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[100%] justify-start text-left font-normal',
            assignments.length === 0 && 'text-muted-foreground'
          )}
        >
          <UserPlus className='w-4 h-4 mr-2' />
          <span>Assign task</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2 w-80'>
        <MultipleCombobox
          occupiedMembers={occupiedMembers}
          availableMembers={availableMembers}
          removeUserAssignment={removeUserAssignment}
          assingUser={assingUser}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
