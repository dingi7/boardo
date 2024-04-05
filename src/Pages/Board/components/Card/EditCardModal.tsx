import { Brain, MoreHorizontal } from "lucide-react";
import React, {
  Dispatch,
  SetStateAction,
  useContext
} from "react";
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
}) => {
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
    const assignment = await createAssignment(user._id, cardId);
    if (!assignment) {
      console.error("Assignment not found for the user");
      return;
    }
    const indexOfMember = availableMembers.indexOf(user);
    const filteredMembers = availableMembers.splice(indexOfMember, 1);
    setAvailableMembers(filteredMembers);
    if (!occupiedMembers.find((member) => member._id === user._id)) {
      setOccupiedMembers([...occupiedMembers, user]);
    }

    SetAssignments([...assignments, assignment]);

    toast({
      title: "User assignment created!",
      variant: "default",
    });
  };

  const removeUserAssignment = async (user: IUserData) => {

    const assignment = assignments.find(
      (assignment) => assignment.user._id === user._id
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

    console.log("user");
    console.log(user);
    console.log("ocupied");
    console.log(occupiedMembers);
    console.log("ava");
    console.log(availableMembers);
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
                className="w-[100%] resize-none h-[150px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Textarea>
              <Button variant={"ghost"} className="w-[20%] h-[150px]" onClick={async () => {
                setDescription(await generateDescription(title))
              }}>
                <Brain/>
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
            <TaskAssignmentPopup
              availableMembers={availableMembers}
              occupiedMembers={occupiedMembers}
              assignments={assignments}
              assingUser={assingUser}
              removeUserAssignment={removeUserAssignment}
            ></TaskAssignmentPopup>
          </div>
          <div>
            <Label>Priority</Label>
            <PrioritySelect
              priority={priority}
              setPriority={setPriority}
            ></PrioritySelect>
          </div>
        </div>
        <DialogClose onClick={handleSave}>
          <div>Save changes</div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsCardModal;
