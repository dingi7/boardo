import { ChevronDown } from "lucide-react";
import { Checkbox } from "src/Components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "src/Components/dropdown";
import { Button } from "src/Components/ui/button";
import { Card } from "src/Components/ui/card";
import { IUserData } from "src/Interfaces/IUserData";

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
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <Button
          variant="ghost"
          size="default"
          className="flex justify-start w-full"
        >
          <span>Select users</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="mt-5 w-72">
        {occupiedMembers &&
          occupiedMembers.length > 0 &&
          occupiedMembers.map((user) => (
            <DropdownMenuItem
              className="w-full"
              onClick={() => removeUserAssignment(user)}
            >
              <li className="flex items-center w-full gap-4 p-3 text-left rounded-md">
                <Checkbox checked />
                <span className="font-semibold">{user.username}</span>
              </li>
            </DropdownMenuItem>
          ))}

        {availableMembers &&
          availableMembers.length > 0 &&
          availableMembers.map((user) => (
            <DropdownMenuItem
              className="w-full"
              onClick={() => assingUser(user)}
            >
              <li className="flex items-center w-full gap-4 p-3 text-left rounded-md">
                <Checkbox />
                <span className="font-semibold text-left">{user.username}</span>
              </li>
            </DropdownMenuItem>
          ))}
        {(!occupiedMembers || occupiedMembers.length === 0) &&
          (!availableMembers || availableMembers.length === 0) && (
            <Card className="p-2">
              <span className="p-4 font-bold">No available users!</span>
            </Card>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultipleCombobox;
