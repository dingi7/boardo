import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { X } from "lucide-react";
import { DropdownMenuSeparator } from "src/Components/dropdown";
import { Card, CardContent, CardHeader } from "src/Components/ui/card";

export const Notification = ({ isRead = false }: { isRead?: boolean }) => {
    return (
        <>
            <DropdownMenuSeparator />
            <Card
                className={`relative border-x-0 border-y-4 ${
                    isRead ? "opacity-60" : ""
                }`}
            >
                {!isRead && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="absolute right-2 top-2">
                                <X />
                            </TooltipTrigger>

                            <TooltipContent>
                                <p className="bg-slate-100 p-2 rounded-md">Mark as read</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
                <CardHeader className="p-2 font-semibold">
                    New assignment
                </CardHeader>
                <CardContent className="p-2">
                    <p>
                        You have been assigned a new assignment for org: TestOrg
                    </p>
                </CardContent>
            </Card>
        </>
    );
};
