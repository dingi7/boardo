export interface dataBaseBoard{
    backgroundUrl: string;
    name: string;
    _id: string;
    lists: dataBaseList[];
    owner: string;
}

export interface dataBaseList{
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
    name: string;
    list: string;
}