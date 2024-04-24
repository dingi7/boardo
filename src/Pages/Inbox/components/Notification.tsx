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
    _id,
    isRead,
    title,
    description,
    markCurrentNotificationAsRead
}: INotification) => {

    return (
        <>
            <DropdownMenuSeparator />
            <Card
                className={`relative border-x-0 border-y-4 p-2 ${
                    isRead ? "opacity-60" : ""
                }`}
            >
                {!isRead && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="absolute right-2 top-2" onClick={() => markCurrentNotificationAsRead(_id)}>
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
                <CardHeader className="px-2 py-0 font-semibold text-md">{title}</CardHeader>
                <CardContent className="px-2 py-0">
                    <div className="text-sm">
                        <p>{description}</p>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};
