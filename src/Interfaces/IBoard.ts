import { dataBaseListWithPosition } from "./IDatabase";

export interface IBoardProps {
    name: string;
    _id: string,
    lists: dataBaseListWithPosition[],
}
