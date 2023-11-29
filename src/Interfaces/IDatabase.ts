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

export interface dataBaseCard{
    _id:string,
    content: string;
    list: string;
    // name: string;
    // _id: string;
    // list: string;
    // description: string;
    // position: number;
}