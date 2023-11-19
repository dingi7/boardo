export interface IListProps {
    id: string;
    name: string;
    initialItems?: IItemProps[];
    setIsOpen: () => void;
}

export interface IItemProps {
    id: string;
    name: string;
    // quantity: number;
    // checked: boolean;
}