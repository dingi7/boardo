import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { X } from "lucide-react";
import { DropdownMenuSeparator } from "src/Components/dropdown";
import { Card, CardContent, CardHeader } from "src/Components/ui/card";
import { INotification } from "src/Interfaces/INotification";

export const Notification = ({
    isMarkedAsRead = false,
    title,
    description,
    organization,
}: INotification) => {
    return (
        <>
            <DropdownMenuSeparator />
            <Card
                className={`relative border-x-0 border-y-4 p-2 ${
                    isMarkedAsRead ? "opacity-60" : ""
                }`}
            >
                {!isMarkedAsRead && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="absolute right-2 top-2">
                                <X />
                            </TooltipTrigger>

                            <TooltipContent>
                                <p className="bg-slate-100 p-2 rounded-md">
                                    Mark as read
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
                <CardHeader className="px-2 py-0 font-semibold text-xl">{title}</CardHeader>
                <CardContent className="px-2 py-0">
                    <div className="text-lg">
                        <p>{description} : <span className="font-medium">{organization.name}</span></p>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};
