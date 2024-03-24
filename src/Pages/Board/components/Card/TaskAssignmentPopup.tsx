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


import { DashboardContext } from "src/Pages/Dashboard/contexts/DashboardContextProvider";
import { IUserData } from "src/Interfaces/IUserData";
import { IAssignment } from "src/Interfaces/IAssignment";


export const TaskAssignmentPopup = ({
  assignments,
  assingUser,
  removeUserAssignment,
}: {
  assignments: Array<IAssignment>;
  removeUserAssignment: (user: IUserData) => void;
  assingUser: (user: IUserData) => void;
}): JSX.Element => {
  const dashboardContext = useContext(DashboardContext);

  const organizationMembers = dashboardContext?.selectedOrganization?.members;
  console.log('organizationMembers');
  
  console.log(organizationMembers);
  
  const occupiedMembers: IUserData[] = [];
  const availableMembers: IUserData[] = [];

  
  useEffect(() => {
    console.log('assignments');
    console.log(assignments);
    
    
    console.log('occupiedMembers');
    console.log(occupiedMembers);
    
    console.log('availableMembers');
    console.log(availableMembers);
  }, [occupiedMembers])

  organizationMembers?.forEach((member) => {
    if (assignments.some((assignment) => assignment.user._id === member._id)) {
      occupiedMembers.push(member);
    } else {
      availableMembers.push(member);
    }
  });



  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[100%] justify-start text-left font-normal",
            !assignments && "text-muted-foreground"
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
              usersList={occupiedMembers}
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
