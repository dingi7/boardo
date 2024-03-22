import { ChevronDown, Plus, X } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "src/Components/dropdown";
import { Button } from "src/Components/ui/button";
import { IUserData } from "src/Interfaces/IUserData";

const MultipleCombobox = ({
  usersList,
  variant,
  action
}: {
  usersList: Array<IUserData> | undefined;
  variant: string;
  action: (id: string) => void;
  
}) => {
  const [selectedValues, setSelectedValues] = React.useState([]);

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
        <DropdownMenuItem className="w-full">
          <li className="flex items-center justify-between w-full gap-4 p-1 border-2 rounded-md border-slate-50">
            <span>Test Testov</span>
            {variant === "addMembers" ? (
              <Button variant="gray" size="icon">
                <Plus />
              </Button>
            ) : (
              <Button variant="delete" size="icon">
                <X />
              </Button>
            )}
          </li>
        </DropdownMenuItem>

        <DropdownMenuItem className="w-full">
          <li className="flex items-center justify-between w-full gap-4 p-1 border-2 rounded-md border-slate-50">
            <span>Test Testov</span>
            {variant === "addMembers" ? (
              <Button variant="gray" size="icon">
                <Plus />
              </Button>
            ) : (
              <Button variant="delete" size="icon">
                <X />
              </Button>
            )}
          </li>
        </DropdownMenuItem>

        <DropdownMenuItem className="w-full">
          <li className="flex items-center justify-between w-full gap-4 p-1 border-2 rounded-md border-slate-50">
            <span>Test Testov</span>
            {variant === "addMembers" ? (
              <Button variant="gray" size="icon">
                <Plus />
              </Button>
            ) : (
              <Button variant="delete" size="icon">
                <X />
              </Button>
            )}
          </li>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultipleCombobox;
