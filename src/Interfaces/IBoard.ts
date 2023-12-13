import { dataBaseList } from "./IDatabase";

export interface IBoardProps {
    name: string;
    _id: string,
    lists: dataBaseList[],
    backgroundUrl: string
}
