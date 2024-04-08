import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../Components/ui/dialog";
import { Button } from "../../../Components/ui/button";
import { DropdownMenuItem } from "src/Components/dropdown";
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "src/Components/Toaster/use-toast";
import { FormInput } from "src/Components/form/form-input";

export function SaveTemplate() {
    const [templateTitle, setTemplateTitle] = useState<string>("");

    const handleSubmit = async (e: any) => {
        if (!templateTitle) {
            e.preventDefault();
            toast({
                title: "Failed to change background",
                description: "You did not select a background",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Background changed",
            description: "Background changed sucessfuly",
            variant: "default",
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Save className="w-4 h-4 mr-2" />
                    <span>Save board as Template</span>
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-200">
                <DialogHeader>
                    <DialogTitle>Save template</DialogTitle>
                </DialogHeader>
                <div>
                    <label>Template name:</label>
                    <FormInput id="templateName" placeholder="Template name..." onChange={(e) => setTemplateTitle(e.target.value)} defaultValue={templateTitle}/>
                </div>
                <DialogFooter className="sm:justify-center">
                    <DialogClose asChild>
                        <Button
                            type="submit"
                            size={"lg"}
                            className="color-black"
                            variant={"primary"}
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
