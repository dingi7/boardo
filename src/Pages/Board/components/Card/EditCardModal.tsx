import { Brain, Check, MoreHorizontal } from "lucide-react";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Button } from "src/Components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/Components/ui/dialog";
import { Input } from "src/Components/ui/input";
import { Label } from "src/Components/ui/label";
import { Textarea } from "src/Components/ui/textarea";
import { DatePicker } from "./DatePicker";
import {
  completeAssignment,
  createAssignment,
  deleteAssignment,
  generateDescription,
  updateCard,
} from "src/api/requests";
import { BoardContext } from "../../contexts/BoardContextProvider";
import { toast } from "src/Components/Toaster/use-toast";
import { PrioritySelect } from "./PriorityDropdown";
import { TaskAssignmentPopup } from "./TaskAssignmentPopup";
import { IUserData } from "src/Interfaces/IUserData";
import { IAssignment } from "src/Interfaces/IAssignment";
import { useAuthUser } from "react-auth-kit";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "src/Components/ui/tooltip";

interface SettingsCardModalProps {
  title: string;
  setTitle: (title: string) => void;
  cardId: string;
  priority: string;
  setPriority: (priority: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  assignments: Array<IAssignment>;
  SetAssignments: (assignments: IAssignment[]) => void;
  description: string;
  setDescription: (description: string) => void;
  availableMembers: IUserData[];
  setAvailableMembers: Dispatch<SetStateAction<IUserData[]>>;
  occupiedMembers: IUserData[];
  setOccupiedMembers: Dispatch<SetStateAction<IUserData[]>>;
  onDeleteCard: (cardId: string) => void;
  setIsCompleted: Dispatch<SetStateAction<boolean>>;
}

const SettingsCardModal: React.FC<SettingsCardModalProps> = ({
  title,
  setTitle,
  cardId,
  priority,
  setPriority,
  date,
  setDate,
  assignments,
  SetAssignments,
  description,
  setDescription,
  availableMembers,
  setAvailableMembers,
  occupiedMembers,
  setOccupiedMembers,
  onDeleteCard,
  setIsCompleted,
}) => {
  const authUser = useAuthUser()();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const context = useContext(BoardContext);
  if (!context) throw new Error("Board context is not available");
  const { boardInfo } = context!;

  const handleSave = async (e: any) => {
    await updateCard(
      cardId,
      boardInfo!.owner,
      title,
      priority,
      date || null,
      description
    );
  };

  const assingUser = async (user: IUserData) => {
    const backupStates = {
      availableMembers,
      occupiedMembers,
      assignments,
    };

    setAvailableMembers(
      availableMembers.filter((member) => member._id !== user._id)
    );
    setOccupiedMembers([...occupiedMembers, user]);

    toast({
      title: "User assignment created!",
      variant: "default",
    });

    const assignment = await createAssignment(user._id, cardId);

    if (!assignment) {
      console.error("Assignment not found for the user");
      toast({
        title: "Assignment not found for the user",
        variant: "destructive",
      });

      setAvailableMembers(backupStates.availableMembers);
      setOccupiedMembers(backupStates.occupiedMembers);
      SetAssignments(backupStates.assignments);
      return;
    }

    SetAssignments([...assignments, assignment]);
  };

  const removeUserAssignment = async (user: any) => {
    const assignment = assignments.find(
      (assignment) => assignment?.user._id === user._id
    );
    if (!assignment) {
      console.error("Assignment not found for the user");
      return;
    }
    await deleteAssignment(assignment._id);

    setOccupiedMembers(
      occupiedMembers.filter((member) => member._id !== user._id)
    );

    setAvailableMembers([...availableMembers, user]);

    const filteredAssignments = assignments.filter(
      (assignmentToRemove) => assignmentToRemove !== assignment
    );
    SetAssignments(filteredAssignments);
    toast({
      title: "User assignment removed!",
      variant: "default",
    });
  };

  const handleComplete = async () => {
    try {
      SetAssignments(
        assignments.map((assignment) => ({ ...assignment, isCompleted: true }))
      );
      toast({
        title: "Success!",
        description: "All assignments for card marked as completed.",
        variant: "default"
      })
      const result = await completeAssignment(cardId);

      if (!result) {
        toast({
          title: "Error",
          description: "Failed to mark assignments as completed.",
          variant: "destructive",
        });
        SetAssignments(
          assignments.map((assignment) => ({
            ...assignment,
            isCompleted: false,
          }))
        );
      }
    } catch (error) {
      console.error("Error completing assignments:", error);
      toast({
        title: "Error",
        description: "Failed to mark assignments as completed.",
        variant: "destructive",
      });
      SetAssignments(
        assignments.map((assignment) => ({ ...assignment, isCompleted: false }))
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <MoreHorizontal className="p-[2%] h-7 flex items-center w-7 hover:bg-slate-200 cursor-pointer rounded-md" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Card</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Edit the card's description, due date, and priority.
        </DialogDescription>
        <div className="flex flex-col">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <div className="flex items-center gap-3">
              <Textarea
                placeholder="Type your description here."
                className="w-[80%] resize-none h-[150px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Textarea>
              <Button
                variant={"ghost"}
                className="w-[20%] h-[150px]"
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    setDescription(await generateDescription(title));
                  } catch (e) {
                    toast({
                      title: "Error!",
                      description: "Error generating description",
                      variant: "destructive",
                    });
                  }
                  setIsLoading(false);
                }}
              >
                {isLoading ? <Brain className="animate-spin" /> : <Brain />}
              </Button>
            </div>
          </div>
          <div>
            <Label>Due date</Label>
            <br></br>
            <DatePicker
              storedDueDate={date}
              setCardDueDate={setDate}
            ></DatePicker>
          </div>
          <div>
            <Label>Distribute task</Label>
            <br></br>
            {authUser &&
            occupiedMembers.some((member) => member._id === authUser._id) ? (
              <div className="flex flex-row gap-4">
                <TaskAssignmentPopup
                  availableMembers={availableMembers}
                  occupiedMembers={occupiedMembers}
                  assignments={assignments}
                  assingUser={assingUser}
                  removeUserAssignment={removeUserAssignment}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        style={{
                          backgroundColor: "rgb(34 197 94)",
                        }}
                        size="icon"
                        onClick={handleComplete}
                      >
                        <Check />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="px-2 py-1 rounded-md">
                        Mark assignment as completed
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ) : (
              <TaskAssignmentPopup
                availableMembers={availableMembers}
                occupiedMembers={occupiedMembers}
                assignments={assignments}
                assingUser={assingUser}
                removeUserAssignment={removeUserAssignment}
              />
            )}
          </div>
          <div>
            <Label>Priority</Label>
            <PrioritySelect
              priority={priority}
              setPriority={setPriority}
            ></PrioritySelect>
          </div>
        </div>

        <div className="flex justify-between w-[80%] mx-auto">
          <DialogClose asChild onClick={() => onDeleteCard(cardId)}>
            <Button variant="destructive">Delete card</Button>
          </DialogClose>
          <DialogClose asChild onClick={handleSave}>
            <Button>Save changes</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsCardModal;
