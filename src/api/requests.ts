import {
    dataBaseBoard as databaseBoard,
    dataBaseList,
} from '../Interfaces/IDatabase';
import { LoginUserData, RegisterUserData } from '../Interfaces/IUserData';
import * as api from './api';

export const endpoints = {
    registerUser: '/auth/register',
    loginUser: '/auth/login',
    // logoutUser: '/users/logout',
    createBoard: '/items/createBoard',
    getByOwnerId: (id: string) => `/items/getBoardsByOwnerId/${id}`,
    getByMemberId: (id: string) => `/items/getBoardsByMemberId/${id}`,
    addMemberToBoard: (boardId: string) => `/items/addMember/${boardId}`,
    removeMemberFromBoard: (boardId: string) =>
        `/items/removeMember/${boardId}`,
    editBoard: (boardId: string) => `/items/boards/${boardId}`,
    deleteBoard: (boardId: string) => `/items/deleteBoard/${boardId}`,
    getBoardByOrg: (orgId: string) => `/items/boards/org/${orgId}`,
    getBoardById: (boardId: string) => `/items/boards/${boardId}`,
    createCard: '/items/cards',
};

export const registerUser = async (userData: RegisterUserData) => {
    return api.post(endpoints.registerUser, userData);
};

export const loginUser = async (userData: LoginUserData) => {
    return api.post(endpoints.loginUser, userData);
};

export const createBoard = async (boardName: string) => {
    return api.post(endpoints.createBoard, boardName);
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

export const getBoards = async () => {
};

export const getBoardById = async (boardId: string) : Promise<databaseBoard> => {
    const data : databaseBoard = await api.get(endpoints.getBoardById(boardId));
    return data;
};

export const updateBoard = async (
    boardId: string,
    boardName: string,
    lists: dataBaseList[]
) => {
    const listIds = lists.map((list: dataBaseList) => list._id);
    const cardIds = lists.map((list: dataBaseList) => list.cards.map((card) => card._id));
    return api.put(endpoints.editBoard(boardId), { boardName, listIds, cardIds });
};

export const createCard = async (
    listId: string,
    content: string,
) => {
    return api.post(endpoints.createCard, { content, listId });
};