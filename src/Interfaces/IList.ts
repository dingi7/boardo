export interface IListProps {
    id: string;
    name: string;
    items?: IItemProps[];
}

export interface IItemProps {
    id: number;
    name: string;
    // quantity: number;
    // checked: boolean;
}