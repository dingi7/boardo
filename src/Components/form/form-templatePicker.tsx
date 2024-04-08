"use client";

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
    const [templates, setTemplates] =
        useState<Array<Record<string, any>>>(defaultTemplates);
    //const [isLoading, setIsLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);

    // useEffect(() => {
    //     const fetchImages = async () => {
    //         try {
    //             const result = await unsplash.photos.getRandom({
    //                 collectionIds: ['317099'],
    //                 count: 9,
    //             });

    //             if (result && result.response) {
    //                 const newImages = result.response as Array<
    //                     Record<string, any>
    //                 >;
    //                 setImages(newImages);
    //             } else {
    //                 console.error('Failed to get images from Unsplash');
    //             }
    //         } catch (error) {
    //             setImages(defaultImages);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchImages();
    // }, []);

    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative">
            <ScrollArea>
                <div className="flex w-max space-x-2 gap-2">
                    {templates.map((template) => (
                        <div
                            key={template._id}
                            className={cn(
                                "w-[100%] h-full cursor-pointer relative aspect-square group hover:opacity-75 transition bg-muted p-2 rounded-md"
                                // pending && "opacity-50 hover:opacity-50 cursor-auto"
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
                <ScrollBar orientation="horizontal"></ScrollBar>
            </ScrollArea>
        </div>
    );
};
