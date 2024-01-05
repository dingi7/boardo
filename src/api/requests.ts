import { dataBaseBoard, dataBaseList } from '../Interfaces/IDatabase';
import { LoginUserData, RegisterUserData } from '../Interfaces/IUserData';
import * as api from './api';

export const endpoints = {
    registerUser: '/auth/register',
    loginUser: '/auth/login',
    getUserOrganizations: `/auth/orgs`,
    // logoutUser: '/users/logout',
    createBoard: '/items/boards',
    getByOwnerId: (id: string) => `/items/getBoardsByOwnerId/${id}`,
    getByMemberId: (id: string) => `/items/getBoardsByMemberId/${id}`,
    addMemberToBoard: (boardId: string) => `/items/addMember/${boardId}`,
    removeMemberFromBoard: (boardId: string) => `/items/removeMember/${boardId}`,
    editBoard: (boardId: string) => `/items/boards/${boardId}`,
    deleteBoard: (boardId: string) => `/items/deleteBoard/${boardId}`,
    getBoardByOrg: (orgId: string) => `/items/boards/org/${orgId}`,
    getBoardById: (boardId: string) => `/items/boards/${boardId}`,
    createCard: '/items/cards',
    deleteCard: (cardId: string) => `/items/cards/${cardId}`,
};

export const registerUser = async (userData: RegisterUserData) => {
    return api.post(endpoints.registerUser, userData);
};

export const loginUser = async (userData: LoginUserData) => {
    return api.post(endpoints.loginUser, userData);
};

export const createBoard = async (data: { name: string, backgroundUrl: string, orgId: string }) => {
    return api.post(endpoints.createBoard, data);
};

export const getBoardsByOwnerId = async (id: string) => {
    return api.get(endpoints.getByOwnerId(id));
};

export const getBoardsByMemberId = async (id: string) => {
    return api.get(endpoints.getByMemberId(id));
};

export const addMemberToBoard = async (boardId: string, memberId: string) => {
    return api.post(endpoints.addMemberToBoard(boardId), { userId: memberId });
};

export const removeMemberFromBoard = async (
    boardId: string,
    memberId: string
) => {
    return api.post(endpoints.removeMemberFromBoard(boardId), {
        userId: memberId,
    });
};

export const editBoard = async (boardId: string, boardName: string) => {
    return api.put(endpoints.editBoard(boardId), { boardName });
};

export const deleteBoard = async (boardId: string) => {
    return api.del(endpoints.deleteBoard(boardId));
};

export const getBoardsByOrgId = async (orgId: string) => {
    return api.get(endpoints.getBoardByOrg(orgId));
};

export const getBoardById = async (boardId: string): Promise<dataBaseBoard> => {
    const data: dataBaseBoard = await api.get(endpoints.getBoardById(boardId));
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
    return api.put(endpoints.editBoard(boardId), {
        boardName,
        listIds,
        cardIds,
    });
};

export const createCard = async (listId: string, content: string) => {
    return api.post(endpoints.createCard, { content, listId });
};

export const deleteCard = async (cardId: string, boardId: string) => {
    return api.del(endpoints.deleteCard(cardId), { boardId });
};

export const getUserOrganizations = async () => {
    return api.get(endpoints.getUserOrganizations);
};
export const updateBoardBackground = async (boardId: string, bgUrl: string) => {
    return api.post(endpoints.getBoardById(boardId), { backgroundUrl: bgUrl });
};

export const removeBoardBackground = async (boardId: string) => {
    return api.post(endpoints.getBoardById(boardId), { backgroundUrl: "" });
};
