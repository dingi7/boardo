export interface IListProps {
    id: string;
    name: string;
    initialItems?: IItemProps[];
    setIsOpen: () => void;
}

export interface IItemProps {
    id: number;
    name: string;
    // quantity: number;
    // checked: boolean;
}