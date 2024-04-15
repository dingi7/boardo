import { IOrgLean } from "./IContexts"

export interface INotification {
    _id: string,
    title: string,
    description: string,
    organization: IOrgLean,
    isMarkedAsRead: boolean
}

