import { dataBaseCard } from "./IDatabase";

export interface IListProps {
    id: string;
    name: string;
    initialItems?: IItemProps[];
    setIsOpen: () => void;
}

export interface IItemProps {
    id: string;
    content: string;
    // quantity: number;
    // checked: boolean;
}

export interface CardItem {
    id: string;
    content: string;
}

export interface ListItem {
    key: string;
    id: string;
    title: string;
    items: dataBaseCard[];
    index?: number;
}
