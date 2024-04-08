import { ArrowLeft, Check, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "../../util/utils";
import { defaultTemplates } from "../../util/templates";
import { FormTextArea } from "./form-textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface FormPickerProps {
    id: string;
    setSelectedTempalte: (template: string) => void;
    isAiGenerated: boolean;
    setIsAiGenerated: () => void;
}

export const TemplatePicker = ({
    id,
    setSelectedTempalte,
    isAiGenerated,
    setIsAiGenerated,
}: FormPickerProps) => {
    const [templates, setTemplates] =
        useState<Array<Record<string, any>>>(defaultTemplates);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const templatesPerPage = 6;
    const [currentTemplates, setCurrentTemplates] = useState<
        Array<Record<string, any>>
    >([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const updateTemplates = () => {
            if (currentPage === 1) {
                setCurrentTemplates(templates.slice(0, templatesPerPage - 1));

                return;
            }


            const newIndexOfLastTemplate = currentPage * templatesPerPage - 2;
            const newIndexOfFirstTemplate =
                newIndexOfLastTemplate - (templatesPerPage - 1);

            setCurrentTemplates(
                templates.slice(
                    newIndexOfFirstTemplate,
                    newIndexOfLastTemplate + 1
                )
            );
        };

        updateTemplates();
    }, [currentPage, templates]);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full">
            {!isAiGenerated ? (
                <>
                    <div className="gap-2 flex flex-wrap">
                        {currentPage === 1 && (
                            <div
                                className={cn(
                                    "w-[30%] h-full cursor-pointer relative aspect-square group hover:opacity-75 transition bg-primary hover:bg-primary/90 p-2 rounded-md"
                                )}
                                onClick={setIsAiGenerated}
                            >
                                <div className="w-full h-full flex items-center justify-center text-center">
                                    <span className="text-white">Generate with AI</span>
                                </div>
                            </div>
                        )}
                        {currentTemplates.map((template, index) => (
                            <div
                                key={template._id}
                                className={cn(
                                    "w-[30%] h-full cursor-pointer relative aspect-square group hover:opacity-75 transition bg-muted p-2 rounded-md"
                                )}
                                onClick={() => {
                                    setSelectedTempalte(template._id);
                                    setSelectedImageId(template._id);
                                    console.log(template._id);
                                }}
                            >
                                <input
                                    type="radio"
                                    id={id}
                                    name={id}
                                    className="hidden"
                                    checked={selectedImageId === template._id}
                                    onChange={() => {}}
                                    value={`${template._id}|${template.name}`}
                                />
                                <div className="w-full h-full flex items-center justify-center text-center">
                                    <span className="">{template.name}</span>
                                </div>
                                {selectedImageId === template._id && (
                                    <div className="absolute inset-0 h-full w-full bg-black/30 flex items-center justify-center rounded-md">
                                        <Check className="h-4 w-4 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        {Array.from({
                            length: Math.ceil(
                                (templates.length + 1) / templatesPerPage
                            ),
                        }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-3 py-1 mx-1 border border-gray-300 rounded-md ${
                                    currentPage === index + 1
                                        ? "bg-gray-300"
                                        : "bg-white"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="flex gap-[2%] items-center w-full">
                        <ArrowLeft
                            className="hover:cursor-pointer"
                            onClick={setIsAiGenerated}
                        />

                        <Label className="font-bold text-md">
                            Type AI prompt
                        </Label>
                    </div>
                    <FormTextArea
                        id="template-textarea"
                        onKeyDown={(e) => console.log(e.target)}
                        placeholder="Type AI prompt..."
                    />
                    <Button>
                        <span className="w-full flex justify-center gap-[4%] items-center">
                            <Sparkles />
                            Generate template
                        </span>
                    </Button>
                </div>
            )}
        </div>
    );
};