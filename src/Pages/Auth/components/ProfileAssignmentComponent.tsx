import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "src/Components/ui/button";

export const ProfileAssignmentComponent = ({
    cardName,
    boardId,
    dueTo,
}: {
    cardName: string;
    boardId: string;
    dueTo: Date;
}) => {
    const dueDate = (dueTo && new Date(dueTo)) || null;

    return (
        <div
            key={boardId}
            className="flex items-center justify-between bg-gray-200 p-2 rounded-md"
        >
            <div className="flex flex-row gap-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                style={{ backgroundColor: "rgb(34 197 94)" }}
                                size="icon"
                            >
                                <Check />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="bg-slate-100 py-1 px-2 rounded-md">
                                Mark assignment as completed
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <div className="flex flex-col">
                    <span className="font-semibold">{cardName}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        Due to:{" "}
                        {(dueDate && dueDate.toLocaleDateString()) ||
                            "No due date"}
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
