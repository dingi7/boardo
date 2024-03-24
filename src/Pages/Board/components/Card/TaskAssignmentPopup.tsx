"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/Components/form/popover";
import { cn } from "src/util/utils";
import { Button } from "src/Components/ui/button";
import { UserPlus } from "lucide-react";
import MultipleCombobox from "./multipleCombobox";
import { useContext, useEffect } from "react";

import { BoardContext } from "../../contexts/BoardContextProvider";
import { DashboardContext } from "src/Pages/Dashboard/contexts/DashboardContextProvider";
import { IUserData } from "src/Interfaces/IUserData";

export const TaskAssignmentPopup = ({
  assignedTo,
  setAssignedTo,
  assingUser,
  removeUserAssignment,
}: {
  assignedTo: Array<IUserData>;
  removeUserAssignment: (user: IUserData) => void;
  assingUser: (user: IUserData) => void;
  setAssignedTo: (assignedTo: IUserData[]) => void;
}): JSX.Element => {
  const dashboardContext = useContext(DashboardContext);

  const organizationMembers = dashboardContext?.selectedOrganization?.members;

  const availableMembers = organizationMembers?.filter(
    (member) => !assignedTo.some((assigned) => assigned._id === member._id)
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[100%] justify-start text-left font-normal",
            !assignedTo && "text-muted-foreground"
          )}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          <span>Assign task</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-5 w-80">
        <div>
          <div>
            <p className="font-semibold break-keep">Selected users</p>
            <MultipleCombobox
              usersList={assignedTo}
              action={removeUserAssignment}
            />
          </div>
          <div>
            <p className="font-semibold break-keep">Select users</p>
            <MultipleCombobox
              usersList={availableMembers}
              action={assingUser}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
