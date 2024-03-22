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

export const TaskAssignmentPopup = ({
  assignedTo,
  setAssignedTo,
  assingUser,
  removeUserAssignment,
}: {
  assignedTo: Array<string>;
  removeUserAssignment: (assigmentId: string) => void;
  assingUser: (userId: string) => void;
  setAssignedTo: (assignedTo: string[]) => void;
}): JSX.Element => {
  const dashboardContext = useContext(DashboardContext);

    const boardContext = useContext(BoardContext)
  useEffect(() => {
    console.log("dashboardContext");
    console.log(dashboardContext);
    console.log("boardContext");
    console.log(boardContext);
  }, [boardContext]);

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
              usersList={undefined}
              variant="removeUsers"
              action={removeUserAssignment}
            />
          </div>
          <div>
            <p className="font-semibold break-keep">Select users</p>
            <MultipleCombobox
              usersList={undefined}
              variant="addMembers"
              action={assingUser}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
