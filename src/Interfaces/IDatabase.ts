export interface dataBaseBoard{
    name: string;
    _id: string;
    lists: dataBaseListWithPosition[];
    owner: string;
}

interface dataBaseList{
    name: string;
    _id: string;
    board: string;
    cards: dataBaseCard[];
}

export interface dataBaseListWithPosition{
    position: number;
    list: dataBaseList;
    _id: string;
}

interface dataBaseCard{
    // name: string;
    // _id: string;
    // list: string;
    // description: string;
    // position: number;
}