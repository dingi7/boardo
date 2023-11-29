import {
    dataBaseBoard,
    dataBaseListWithPosition,
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
    const orgId = localStorage.getItem('orgId');
};

export const getBoardById = async (boardId: string) : Promise<dataBaseBoard> => {
    const data : dataBaseBoard = await api.get(endpoints.getBoardById(boardId));
    const orderedLists = data.lists.sort(
        (a: dataBaseListWithPosition, b: dataBaseListWithPosition) => a.position - b.position
    );
    return { ...data, lists: orderedLists };
};

export const updateBoard = async (
    boardId: string,
    boardName: string,
    lists: dataBaseListWithPosition[]
) => {
    const listIds = lists.map((list: dataBaseListWithPosition) => list.list._id);
    return api.put(endpoints.editBoard(boardId), { boardName, listIds });
};
