import { dataBaseBoard, dataBaseList } from "../Interfaces/IDatabase";
import { LoginUserData, RegisterUserData } from "../Interfaces/IUserData";
import * as api from "./api";

export const endpoints = {
    registerUser: "/auth/register",
    loginUser: "/auth/login",
    orgs: `/auth/orgs`,
    createBoard: "/items/boards",

    allOrgs: "/auth/allOrgs",
    joinOrg: (orgId: string) => `/auth/joinOrg/${orgId}`,

    getBoardsByOrg: (orgId: string) => `/items/boards/org/${orgId}`,
    board: (boardId: string | null) =>
        boardId ? `/items/boards/${boardId}` : "/items/boards",
    card: (cardId: string | null) =>
        cardId ? `/items/cards/${cardId}` : "/items/cards",
    list: (listId: string | null) =>
        listId ? `/items/list/${listId}` : "/items/list",
    organization: (orgId: string | null) =>
        orgId ? `/auth/orgs/${orgId}` : "/auth/orgs",

    resetPasswordRequest: `/auth/resetPasswordRequest`,
    requestResetPassword: (uuid: string): string =>
        `/auth/resetPassword/${uuid}`,
    tokenValidator: (uuid: string): string => `/auth/tokenValidator/${uuid}`,
    removeMemberFromBoard: (boardId: string) =>
        `/auth/orgs/${boardId}/kickMember`,
};

export const renameCard = async (
    cardId: string,
    organizationId: string,
    name: string
) => {
    return api.put(endpoints.card(cardId), { organizationId, name });
};

export const changeCardPriority = async (
    cardId: string,
    organizationId: string,
    priority: string
) => {
    return api.put(endpoints.card(cardId), { organizationId, priority });
};

export const setCardDueDate = async (
    cardId: string,
    organizationId: string,
    dueDate: Date
) => {
    return api.put(endpoints.card(cardId), { organizationId, dueDate });
};

export const deleteOrganization = async (orgId: string, password: string) => {
    return api.del(endpoints.organization(orgId), { password });
};

export const updateOrganizationName = async (
    orgId: string,
    name: string
) => {
    return api.put(endpoints.organization(orgId), { name });
}

export const updateOrganizationPassword = async (
    orgId: string,
    password: string,
    oldPassword: string
) => {
    return api.put(endpoints.organization(orgId), { password, oldPassword });
}

export const tokenValidator = async (uuid: string) => {
    return api.post(endpoints.tokenValidator(uuid));
};

export const requestResetPassword = async (email: string) => {
    return api.post(endpoints.resetPasswordRequest, { email });
};

export const resetPassword = async (uuid: string, password: string) => {
    return api.post(endpoints.requestResetPassword(uuid), {
        newPassword: password,
        token: uuid,
    });
};

export const deleteList = async (listId: string) => {
    return api.del(endpoints.list(listId));
};

export const joinOrganization = async (orgId: string, password: string) => {
    return api.post(endpoints.joinOrg(orgId), { password });
};

export const createList = async (boardId: string, name: string) => {
    return api.post(endpoints.list(null), { boardId, name });
};

export const renameList = async (
    listId: string,
    name: string,
    organizationId: string
) => {
    return api.put(endpoints.list(listId), { name, organizationId });
};

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

export const removeMemberFromBoard = async (
    boardId: string,
    memberId: string
) => {
    return api.post(endpoints.removeMemberFromBoard(boardId), {
        memberId,
    });
};

export const editBoard = async (boardId: string, boardName: string) => {
    return api.put(endpoints.board(boardId), { boardName });
};

export const deleteBoard = async (boardId: string) => {
    return api.del(endpoints.board(boardId));
};

export const getBoardsByOrgId = async (orgId: string) => {
    const queryParams = { populate: "true" };
    const queryString = new URLSearchParams(queryParams).toString();
    return api.get(`${endpoints.getBoardsByOrg(orgId)}?${queryString}`);
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

export const updateBoardName = async (boardId: string, boardName: string) => {
    return api.put(endpoints.board(boardId), { boardName });
};

export const createCard = async (
    listId: string,
    content: string,
    organizationId: string
) => {
    return api.post(endpoints.card(null), { content, listId, organizationId });
};

export const deleteCard = async (
    cardId: string,
    boardId: string,
    organizationId: string
) => {
    return api.del(endpoints.card(cardId), { boardId, organizationId });
};

export const getUserOrganizations = async () => {
    return api.get(endpoints.orgs);
};
export const changeBoardBackground = async (boardId: string, bgUrl: string) => {
    return api.put(endpoints.board(boardId), { backgroundUrl: bgUrl });
};

export const removeBoardBackground = async (boardId: string) => {
    return api.post(endpoints.board(boardId), { backgroundUrl: "" });
};
