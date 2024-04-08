import { X } from "lucide-react";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { Button } from "../ui/button";
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "./popover";
import { FormPicker } from "./form-picker";
import { useContext, useState } from "react";
import { createBoard } from "../../api/requests";
import { DashboardContext } from "../../Pages/Dashboard/contexts/DashboardContextProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Toaster/use-toast";
import { Toggle } from "../ui/toggle";
import { TemplatePicker } from "./form-templatePicker";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export const FormPopover = ({
    children,
    side = "right",
    align,
    sideOffset = 0,
}: FormPopoverProps) => {
    const context = useContext(DashboardContext);
    const { toast } = useToast();
    if (!context) {
        throw new Error("Dashboard context is not available");
    }
    const { selectedOrganization } = context;

    const navigate = useNavigate();

    const [image, setSelectedImage] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [isTemplateToggled, setIsTemplateToggled] = useState<boolean>(false);
    const [template, setSelectedTempalte] = useState<string | null>(null);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleFormSubmit = async () => {
        try {
            const result = await createBoard({
                name: title,
                backgroundUrl: image!,
                orgId: selectedOrganization!._id,
            });
            navigate(`/board/${result._id}`);
        } catch (error: any) {
            toast({
                title: "Failed to create board",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    const handleSwitchToggle = () => {
        setIsTemplateToggled((prevState) => !prevState);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent
                align={align}
                className="w-80 pt-3 bg-slate-200"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create board
                </div>
                <PopoverClose asChild>
                    <Button
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form
                    onSubmit={async (e: any) => {
                        e.preventDefault();
                        await handleFormSubmit();
                    }}
                    className="space-y-4"
                >
                    <div className="space-y-4">
                        <FormPicker
                            id="image"
                            setSelectedImage={setSelectedImage}
                        />
                        <FormInput
                            id="title"
                            label="Board title"
                            type="text"
                            onChange={handleTitleChange}
                        />
                    </div>

                    {/* <div className="border-4 border-black border-solid space-y-10">
                        <div className={`${isTemplateToggled && "mb-4"}`}>
                            <Toggle
                                variant={
                                    isTemplateToggled ? "checked" : "outline"
                                }
                                onClick={() =>
                                    setIsTemplateToggled(!isTemplateToggled)
                                }
                            >
                                Use template
                            </Toggle>
                        </div>

                        {isTemplateToggled && (
                            <TemplatePicker
                                id="template"
                                setSelectedTempalte={setSelectedTempalte}
                            />
                        )}
                    </div> */}
                        <Popover >
                            <PopoverTrigger asChild>
                                <Button className="w-full" variant="secondary">
                                    Use template
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-80 h-[300px] overflow-hidden pt-3 bg-slate-200">
                                <TemplatePicker
                                    id="template"
                                    setSelectedTempalte={setSelectedTempalte}
                                />
                            </PopoverContent>
                        </Popover>
                 
                    <FormSubmit className="w-full">Create</FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
