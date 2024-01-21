export interface dataBaseBoard {
    backgroundUrl: string;
    name: string;
    _id: string;
    lists: dataBaseList[];
    owner: string;
}

export interface dataBaseList {
    name: string;
    styles?: {
        backgroundColor: string;
    };
    _id: string;
    board: string;
    cards: dataBaseCard[];
}

export interface dataBaseCard {
    _id: string;
    name: string;
    list: string;
}

export interface dataBaseOrganization {
    _id: string;
    name: string;
    owner?: string;
    members?: string[];
}
