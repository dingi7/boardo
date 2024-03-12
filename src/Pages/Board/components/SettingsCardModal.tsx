import { Brain, MoreHorizontal } from "lucide-react";
import React from "react";
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

const SettingsCardModal = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <MoreHorizontal className="on:hover: cursor-pointer" />
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
                        <Input type="text" />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <div className="flex items-center gap-3">
                            <Textarea
                                placeholder="Type your description here."
                                className="w-[80%] resize-none h-[150px]"
                            />
                            <Button variant={"ghost"} className="w-[20%] h-[150px]">
                                <Brain />
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Label>Due date</Label>
                        <Input type="date" />
                    </div>
                    <div>
                        <Label>Priority</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Urgency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="urgent">Urgent</SelectItem>
                                <SelectItem value="important">
                                    Important
                                </SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsCardModal;
