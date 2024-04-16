import { IOrgLean } from "./IContexts"

export interface INotification {
    _id: string,
    title: string,
    description: string,
    isRead: boolean,
    markCurrentNotificationAsRead: (notificationId: string) => void
}

