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
import { getNotifications, markAllNotificationsRead, markNotificationRead } from "src/api/requests";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "src/Components/ui/pagination";

import { useAuthUser } from "react-auth-kit";

export const InboxDialog = () => {
    const authUser = useAuthUser()();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<INotification[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const notificationsPerPage = 5;
    const [neededPages, setNeededPages] = useState<number>(1);

    const [currentNotifications, setCurrentNotifications] = useState<
        Array<INotification>
    >([]);

    useEffect(() => {
        (async () => {
            const result = await getNotifications();
            setNotifications(result);

            setNeededPages(
                Math.ceil((result.length + 1) / notificationsPerPage)
            );
        })();
    }, [authUser]);

    useEffect(() => {
        const newIndexOfLastNotification =
            currentPage * notificationsPerPage - 1;
        const newIndexOfFirstNotification =
            newIndexOfLastNotification - (notificationsPerPage - 1);

        setCurrentNotifications(
            notifications.slice(
                newIndexOfFirstNotification,
                newIndexOfLastNotification + 1
            )
        );
    }, [currentPage, notifications]);

    const handleMarkAllAsRead = () => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) => ({
                ...notification,
                isRead: true,
            }))
        );

        markAllNotificationsRead()
    };

    const markCurrentNotificationAsRead = (notificationId: string) => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification._id === notificationId
                    ? { ...notification, isRead: true }
                    : notification
            )
        );

        markNotificationRead(notificationId)
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

                {currentNotifications ? (
                    currentNotifications.map((notification) => (
                        <Notification
                            {...notification}
                            markCurrentNotificationAsRead={
                                markCurrentNotificationAsRead
                            }
                        />
                    ))
                ) : (
                    <>
                        <DropdownMenuSeparator />
                        <p className="text-lg font-bold text-center p-2">
                            No notifications yet
                        </p>
                    </>
                )}
                <div>
                    <DropdownMenuSeparator />
                    <Pagination className="select-none">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => {
                                        setCurrentPage(
                                            (prevPage) => prevPage - 1
                                        );
                                    }}
                                    className={`hover:cursor-pointer ${
                                        currentPage === 1 ? "hidden" : ""
                                    }`}
                                />
                            </PaginationItem>

                            <PaginationItem className="hover:cursor-pointer">
                                <PaginationLink isActive={currentPage === 1}>
                                    1
                                </PaginationLink>
                            </PaginationItem>

                            {currentPage > 2 && (
                                <PaginationItem className="hover:cursor-pointer">
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            {currentPage !== 1 &&
                                currentPage !== neededPages && (
                                    <PaginationItem className="hover:cursor-pointer">
                                        <PaginationLink isActive>
                                            {currentPage}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                            {currentPage < neededPages - 1 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            {neededPages !== 1 && (
                                <PaginationItem className="hover:cursor-pointer">
                                    <PaginationLink
                                        isActive={currentPage === neededPages}
                                    >
                                        {neededPages}
                                    </PaginationLink>
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => {
                                        setCurrentPage(
                                            (prevPage) => prevPage + 1
                                        );
                                    }}
                                    className={`hover:cursor-pointer ${
                                        currentPage === neededPages
                                            ? "hidden"
                                            : ""
                                    }`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </DropdownMenuContent>
        </>
    );
};
