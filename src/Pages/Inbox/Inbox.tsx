import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/Components/dropdown';
import { Notification } from './components/Notification';
import { Button } from 'src/Components/ui/button';
import { INotification } from 'src/Interfaces/INotification';
import { useEffect, useState } from 'react';
import { Inbox } from 'lucide-react';
import { Badge } from 'src/Components/ui/badge';
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from 'src/api/requests';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'src/Components/ui/pagination';

import { useAuthUser } from 'react-auth-kit';

export const InboxDialog = () => {
  const authUser = useAuthUser()();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);

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
      setUnreadNotifications(
        result.filter((notification: INotification) => !notification.isRead)
          .length
      );

      setNeededPages(Math.ceil((result.length + 1) / notificationsPerPage));
    })();
  }, [authUser]);

  useEffect(() => {
    const newIndexOfLastNotification = currentPage * notificationsPerPage - 1;
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
    setUnreadNotifications(0);

    markAllNotificationsRead();
  };

  const markCurrentNotificationAsRead = (notificationId: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification._id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadNotifications(
      (prevUnreadNotifications) => prevUnreadNotifications - 1
    );

    markNotificationRead(notificationId);
  };

  return (
    <>
      <DropdownMenuTrigger>
        <div
          className='relative group'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Button variant='ghost' size='icon'>
            <Inbox />
          </Button>

          <Badge
            className={`absolute w-6 h-6 flex justify-center items-center text-sm p-1 rounded-full top-0 right-0 transform translate-x-10 translate-y-10 ${
              isHovered ? 'opacity-0' : ''
            } transition-opacity duration-200 ease-in-out`}
            variant='secondary'
          >
            {unreadNotifications}
          </Badge>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex flex-col oveflow-hidden'>
        <DropdownMenuLabel className='px-2 py-1 w-fit'>
          <div className='flex items-center justify-between w-full'>
            <p className='text-2xl font-bold'>Notifications</p>
            <Button variant='link' onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          </div>
        </DropdownMenuLabel>

        <div className='w-36'>
          {currentNotifications ? (
            currentNotifications
              .reverse()
              .map((notification) => (
                <Notification
                  {...notification}
                  markCurrentNotificationAsRead={markCurrentNotificationAsRead}
                />
              ))
          ) : (
            <>
              <DropdownMenuSeparator />
              <p className='p-2 text-lg font-bold text-center'>
                No notifications yet
              </p>
            </>
          )}
        </div>
        <div>
          <DropdownMenuSeparator />
          <Pagination className='w-full select-none'>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    setCurrentPage((prevPage) => prevPage - 1);
                  }}
                  className={`hover:cursor-pointer ${
                    currentPage === 1 ? 'hidden' : ''
                  }`}
                />
              </PaginationItem>

              <PaginationItem className='hover:cursor-pointer'>
                <PaginationLink
                  isActive={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {currentPage > 2 && (
                <PaginationItem className='hover:cursor-pointer'>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {currentPage !== 1 && currentPage !== neededPages && (
                <PaginationItem className='hover:cursor-pointer'>
                  <PaginationLink isActive>{currentPage}</PaginationLink>
                </PaginationItem>
              )}

              {currentPage < neededPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {neededPages !== 1 && (
                <PaginationItem className='hover:cursor-pointer'>
                  <PaginationLink
                    isActive={currentPage === neededPages}
                    onClick={() => setCurrentPage(neededPages)}
                  >
                    {neededPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    setCurrentPage((prevPage) => prevPage + 1);
                  }}
                  className={`hover:cursor-pointer ${
                    currentPage === neededPages ? 'hidden' : ''
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
