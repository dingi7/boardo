import { dataBaseBoard, dataBaseList } from '../Interfaces/IDatabase';
import { LoginUserData, RegisterUserData } from '../Interfaces/IUserData';
import * as api from './api';

export const endpoints = {
    registerUser: '/auth/register',
    loginUser: '/auth/login',
    orgs: `/auth/orgs`,
    createBoard: '/items/boards',

    allOrgs: '/auth/allOrgs',
    getBoardsByOrg: (orgId: string) => `/items/boards/org/${orgId}`,
    board: (boardId: string | null) =>
        boardId ? `/items/boards/${boardId}` : '/items/boards',
    card: (cardId: string | null) =>
        cardId ? `/items/cards/${cardId}` : '/items/cards',
    list: (listId: string | null) =>
        listId ? `/items/list/${listId}` : '/items/list',

    addMemberToBoard: (boardId: string) => `/items/addMember/${boardId}`,
    // removeMemberFromBoard: (boardId: string) =>
    //     `/items/removeMember/${boardId}`,
};

export const createList = async (boardId: string, name: string) => {
    return api.post(endpoints.list(null), { boardId, name });
}

export const createOrganization = async (data: {
    name: string;
    password: string;
}) => {
    return api.post(endpoints.orgs, data);
};

export const getAllOrganizations = async () => {
    return api.get(endpoints.allOrgs);
};

export const registerUser = async (userData: RegisterUserData) => {
    return api.post(endpoints.registerUser, userData);
};

export const loginUser = async (userData: LoginUserData) => {
    return api.post(endpoints.loginUser, userData);
};

export const createBoard = async (data: {
    name: string;
    backgroundUrl: string;
    orgId: string;
}) => {
    return api.post(endpoints.createBoard, data);
};

export const addMemberToBoard = async (boardId: string, memberId: string) => {
    return api.post(endpoints.addMemberToBoard(boardId), { userId: memberId });
};

export const removeMemberFromBoard = async (
    boardId: string,
    memberId: string
) => {
    // return api.post(endpoints.removeMemberFromBoard(boardId), {
    //     userId: memberId,
    // });
};

export const editBoard = async (boardId: string, boardName: string) => {
    return api.put(endpoints.board(boardId), { boardName });
};

export const deleteBoard = async (boardId: string) => {
    return api.del(endpoints.board(boardId));
};

export const getBoardsByOrgId = async (orgId: string) => {
    return api.get(endpoints.getBoardsByOrg(orgId));
};

export const getBoardById = async (boardId: string): Promise<dataBaseBoard> => {
    const data: dataBaseBoard = await api.get(endpoints.board(boardId));
    return data;
};

export const updateBoard = async (
    boardId: string,
    boardName: string,
    lists: dataBaseList[]
) => {
    const listIds = lists.map((list: dataBaseList) => list._id);
    const cardIds = lists.map((list: dataBaseList) =>
        list.cards.map((card) => card._id)
    );
    return api.put(endpoints.board(boardId), {
        boardName,
        listIds,
        cardIds,
    });
};

export const createCard = async (listId: string, content: string) => {
    return api.post(endpoints.card(null), { content, listId });
};

export const deleteCard = async (cardId: string, boardId: string) => {
    return api.del(endpoints.card(cardId), { boardId });
};

export const getUserOrganizations = async () => {
    return api.get(endpoints.orgs);
};
export const updateBoardBackground = async (boardId: string, bgUrl: string) => {
    return api.put(endpoints.board(boardId), { backgroundUrl: bgUrl });
};

export const removeBoardBackground = async (boardId: string) => {
    return api.post(endpoints.board(boardId), { backgroundUrl: '' });
};

export const uploadBoardBackground = async (formData: FormData) => {
    try {
        const response = await fetch(
            'https://api.cloudinary.com/v1_1/drmxfdj5o/image/upload',
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

export const destroyBoardBackground = async (boardId: string) => {};
