import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "../../util/utils";
import { defaultTemplates } from "../../util/templates";
import { ScrollArea, ScrollBar } from "../ui/scrollArea";

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | undefined>;
    setSelectedTempalte: (template: string) => void;
}

export const TemplatePicker = ({
    id,
    errors,
    setSelectedTempalte,
}: FormPickerProps) => {
    const [templates, setTemplates] = useState<Array<Record<string, any>>>(defaultTemplates);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const templatesPerPage = 6;
    const [currentTemplates, setCurrentTemplates] = useState<Array<Record<string, any>>>([]);;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const updateTemplates = () => {
            const newIndexOfLastTemplate = currentPage * templatesPerPage - 1;
            const newIndexOfFirstTemplate = newIndexOfLastTemplate - (templatesPerPage - 1);

            setCurrentTemplates(templates.slice(newIndexOfFirstTemplate, newIndexOfLastTemplate + 1));
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
            <div className="gap-2 flex flex-wrap">
                {currentTemplates.map((template) => (
                    <div
                        key={template._id}
                        className={cn(
                            "w-[30%] h-full cursor-pointer relative aspect-square group hover:opacity-75 transition bg-muted p-2 rounded-md"
                        )}
                        onClick={() => {
                            setSelectedTempalte(template._id);
                            setSelectedImageId(template._id);
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
                    length: Math.ceil(templates.length / templatesPerPage),
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
        </div>
    );
};
