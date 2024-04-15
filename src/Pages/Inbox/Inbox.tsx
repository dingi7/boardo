import {
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "src/Components/dropdown";
import { Notification } from "./components/Notification";
import { Button } from "src/Components/ui/button";

export const InboxDialog = () => {
    return (
        <DropdownMenuContent className="w-full">
            <DropdownMenuLabel className="px-2 py-1">
                <div className="w-full flex justify-between items-center">
                    <p className="text-xl font-bold">Notifications</p>
                    <Button variant="link">Mark all as read</Button>
                </div>
            </DropdownMenuLabel>

            <Notification isRead />

            <Notification isRead />

            <Notification />
        </DropdownMenuContent>
    );
};
