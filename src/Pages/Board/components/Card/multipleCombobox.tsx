import { ChevronDown } from "lucide-react";
import React from "react";
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
  usersList,
  action,
}: {
  usersList: Array<IUserData> | undefined;
  action: (user: IUserData) => void; 
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
        {usersList && usersList?.length > 0 ? (
          usersList?.map((user) => (
            <DropdownMenuItem className="w-full" onClick={() => action(user)}>
              <li className="flex items-center justify-between w-full gap-4 p-3 border-2 rounded-md border-slate-50">
                <span className="font-semibold">{user.username}</span>
              </li>
            </DropdownMenuItem>
          ))
        ) : (
          <Card className="p-2">
            <span className="p-4 font-bold ">No avaliable users!</span>
          </Card>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultipleCombobox;
