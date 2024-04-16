import {
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "src/Components/dropdown";
import { Notification } from "./components/Notification";
import { Button } from "src/Components/ui/button";
import { INotification } from "src/Interfaces/INotification";
import { useEffect, useState } from "react";
import { Inbox } from "lucide-react";
import { Badge } from "src/Components/ui/badge";
import { getNotifications } from "src/api/requests";

export const InboxDialog = () => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<INotification[]>([]);

    useEffect(() => {
        (async () => {
            setNotifications(await getNotifications());
        })();
    }, []);

    const handleMarkAllAsRead = () => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) => ({
                ...notification,
                isRead: true,
            }))
        );
    };

    const markCurrentNotificationAsRead = (notificationId: string) => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification._id === notificationId
                    ? { ...notification, isRead: true }
                    : notification
            )
        );
    };

    return (
        <>
            <DropdownMenuTrigger>
                <div
                    className="relative group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Button variant="ghost" size="icon">
                        <Inbox />
                    </Button>

                    <Badge
                        className={`absolute w-6 h-6 flex justify-center items-center text-sm p-1 rounded-full top-0 right-0 transform translate-x-10 translate-y-10 ${
                            isHovered ? "opacity-0" : ""
                        } transition-opacity duration-200 ease-in-out`}
                        variant="secondary"
                    >
                        {notifications.length}
                    </Badge>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
                <DropdownMenuLabel className="px-2 py-1">
                    <div className="w-full flex justify-between items-center">
                        <p className="text-2xl font-bold">Notifications</p>
                        <Button variant="link" onClick={handleMarkAllAsRead}>
                            Mark all as read
                        </Button>
                    </div>
                </DropdownMenuLabel>

                {notifications?.length > 0 ? (
                    notifications.map((notification) => (
                        <Notification {...notification} markCurrentNotificationAsRead={markCurrentNotificationAsRead}/>
                    ))
                ) : (
                    <>
                        <DropdownMenuSeparator />
                        <p className="text-lg font-bold text-center p-2">
                            No notifications yet
                        </p>
                    </>
                )}
            </DropdownMenuContent>
        </>
    );
};
