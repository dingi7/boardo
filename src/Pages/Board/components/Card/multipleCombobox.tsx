import { ChevronDown } from 'lucide-react';
import { Checkbox } from 'src/Components/ui/checkbox';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'src/Components/dropdown';
import { Button } from 'src/Components/ui/button';
import { Card } from 'src/Components/ui/card';
import { IUserData } from 'src/Interfaces/IUserData';

const MultipleCombobox = ({
  occupiedMembers,
  availableMembers,
  removeUserAssignment,
  assingUser,
}: {
  occupiedMembers: Array<IUserData>;
  availableMembers: Array<IUserData>;
  removeUserAssignment: (user: IUserData) => void;
  assingUser: (user: IUserData) => void;
}) => {
  return (
    <div>
      {occupiedMembers &&
        occupiedMembers.length > 0 &&
        occupiedMembers.map((user) => (
          <DropdownMenuItem
            className='w-full'
            onClick={() => removeUserAssignment(user)}
            key={user._id}
          >
            <li className='flex items-center w-full gap-4 p-2 text-left rounded-md'>
              <Checkbox checked />
              <span className='font-semibold'>{user.username}</span>
            </li>
          </DropdownMenuItem>
        ))}

      {availableMembers &&
        availableMembers.length > 0 &&
        availableMembers.map((user) => (
          <DropdownMenuItem
            className='w-full'
            onClick={() => assingUser(user)}
            key={user._id}
          >
            <li className='flex items-center w-full gap-4 p-2 text-left rounded-md'>
              <Checkbox />
              <span className='font-semibold text-left'>{user.username}</span>
            </li>
          </DropdownMenuItem>
        ))}
      {(!occupiedMembers || occupiedMembers.length === 0) &&
        (!availableMembers || availableMembers.length === 0) && (
          <Card className='p-2'>
            <span className='p-4 font-bold'>No available users!</span>
          </Card>
        )}
    </div>
  );
};

export default MultipleCombobox;
