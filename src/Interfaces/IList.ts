import { dataBaseCard } from "./IDatabase";

export interface ListItem {
    key: string;
    id: string;
    title: string;
    cards: dataBaseCard[];
    index?: number;
    onCardAdd? : (listId: string, name: string) => void;
    onDeleteCard: (cardId: string) => void;
}
