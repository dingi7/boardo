import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ArrowRight, Check } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import { toast } from "src/Components/Toaster/use-toast";
import { Button } from "src/Components/ui/button";
import { IAssignment } from "src/Interfaces/IAssignment";
import { completeAssignment } from "src/api/requests";

export const ProfileAssignmentComponent = ({
  cardName,
  boardId,
  dueTo,
  cardId,
  setUserAssignments,
  userAssignments,
  assignmentId
}: {
  cardName: string;
  boardId: string;
  dueTo: Date;
  cardId: string;
  setUserAssignments: Dispatch<SetStateAction<IAssignment[]>>;
  userAssignments: IAssignment[];
  assignmentId: string
}) => {
  const authUser = useAuthUser()();
  const dueDate = (dueTo && new Date(dueTo)) || null;

  const handleComplete = async () => {
    try {
        console.log(userAssignments);
        console.log(authUser);
        
        
      const backupAssignmenst = userAssignments;
      const assignment = userAssignments.find(
        (assignment) => assignment._id === assignmentId
      );
      const filteredAssignments = userAssignments.filter(
        (assignmentToRemove) => assignmentToRemove !== assignment
      );
      setUserAssignments(filteredAssignments);

      toast({
        title: "Success!",
        description: "Assignment marked as completed.",
        variant: "default",
      });
      const result = await completeAssignment(cardId);

      if (!result) {
        toast({
          title: "Error",
          description: "Failed to mark assignment as completed.",
          variant: "destructive",
        });
        setUserAssignments(backupAssignmenst);
      }
    } catch (error) {
      console.error("Error completing assignment:", error);
      toast({
        title: "Error",
        description: "Failed to mark assignment as completed.",
        variant: "destructive",
      });
    }
  };
  return (
    <div
      key={boardId}
      className="flex items-center justify-between p-2 bg-gray-200 rounded-md"
    >
      <div className="flex flex-row gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                style={{ backgroundColor: "rgb(34 197 94)" }}
                size="icon"
                onClick={handleComplete}
              >
                <Check />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="px-2 py-1 rounded-md bg-slate-100">
                Mark assignment as completed
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-col">
          <span className="font-semibold">{cardName}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Due to: {(dueDate && dueDate.toLocaleDateString()) || "No due date"}
          </span>
        </div>
      </div>

      <Link to={`/board/${boardId}`} className="mr-2 hover:underline">
        <p className="flex gap-1">
          <span>Go to card</span>
          <ArrowRight />
        </p>
      </Link>
    </div>
  );
};
