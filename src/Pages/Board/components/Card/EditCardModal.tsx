import { Brain, MoreHorizontal } from "lucide-react";
import React, { useContext, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/Components/select";
import { Button } from "src/Components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/Components/ui/dialog";
import { Input } from "src/Components/ui/input";
import { Label } from "src/Components/ui/label";
import { Textarea } from "src/Components/ui/textarea";
import { DatePicker } from "./DatePicker";
import { addAssignmentToUser, getAllAssignments, removeAssignmentFromUser, updateCard } from "src/api/requests";
import { BoardContext } from "../../contexts/BoardContextProvider";
import { toast } from "src/Components/Toaster/use-toast";
import { PrioritySelect } from "./PriorityDropdown";
import { TaskAssignmentPopup } from "./TaskAssignmentPopup";

interface SettingsCardModalProps {
  title: string;
  cardId: string;
  onDeleteCard?: any;
  setIsInputActive: (active: boolean) => void;
  priority: string;
  setPriority: (priority: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  assignedTo: Array<string>;
  setAssignedTo: (assignedTo: string[]) => void; 
}

const SettingsCardModal: React.FC<SettingsCardModalProps> = ({
  title,
  cardId,
  onDeleteCard,
  setIsInputActive,
  priority,
  setPriority,
  date,
  setDate,
  assignedTo,
  setAssignedTo
}) => {
  const context = useContext(BoardContext);
  if (!context) throw new Error("Board context is not available");
  const { boardInfo } = context!;

  const handleSave = async (e: any) => {
    await updateCard(cardId, boardInfo!.owner, title, priority, date || null);
  };

  const assingUser = async (userId: string) => {
    await addAssignmentToUser(userId, cardId)
  }

  const removeUserAssignment = async (assigmentId: string) => {
    await removeAssignmentFromUser(assigmentId)
  }


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
            <Input type="text" value={title} />
          </div>
          <div>
            <Label>Descriptionn</Label>
            <div className="flex items-center gap-3">
              <Textarea
                placeholder="Type your description here."
                className="w-[100%] resize-none h-[150px]"
              ></Textarea>
              <Button variant={"ghost"} className="w-[20%] h-[150px]">
                <Brain></Brain>
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
            assingUser={assingUser}
            removeUserAssignment={removeUserAssignment}
            assignedTo={assignedTo}
            setAssignedTo={setAssignedTo}
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
          <div> Save changes</div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsCardModal;
