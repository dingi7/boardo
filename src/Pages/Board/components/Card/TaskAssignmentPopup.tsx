"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/Components/form/popover";
import { cn } from "src/util/utils";
import { Button } from "src/Components/ui/button";
import { Plus, UserPlus } from "lucide-react";

export const TaskAssignmentPopup = ({
  assignedTo,
  setAssignedTo,
}: {
  assignedTo: Array<string>;
  setAssignedTo: (assignedTo: string[]) => void;
}): JSX.Element => {
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
          {/* {storedDueDate ? (
                        format(storedDueDate, 'PPP')
                    ) : (
                    )} */}
          <span>Assign task</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-5 w-80">
        <div>
          <div>
            <p className="font-semibold break-keep">Selected users</p>
            <ul className="mt-2">
            <li className="p-1 border-2 rounded-md border-slate-50">
                <span>Test Testov</span>
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <p className="font-semibold break-keep">Select users</p>
            <ul className="mt-2">
              <li className="flex items-center justify-between p-1 border-2 rounded-md border-slate-50">
                <span>Test Testov</span>
                <Button variant="gray" className="ml-auto mr-2 "><Plus /></Button>
              </li>
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
