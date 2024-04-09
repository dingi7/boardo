import { dataBaseBoard, dataBaseList } from '../Interfaces/IDatabase';
import {
    LoginUserData,
    RegisterUserData,
    UpdateCredentialsData,
} from '../Interfaces/IUserData';
import * as api from './api';

export const endpoints = {
    registerUser: '/auth/register',
    loginUser: '/auth/login',
    updateUserCredentials: '/auth/updateCredentials',
    orgs: `/auth/orgs`,
    createBoard: '/items/boards',

    allOrgs: '/auth/allOrgs',
    joinOrg: (orgId: string) => `/auth/joinOrg/${orgId}`,

    getBoardsByOrg: (orgId: string) => `/items/boards/org/${orgId}`,
    board: (boardId: string | null) =>
        boardId ? `/items/boards/${boardId}` : '/items/boards',
    card: (cardId: string | null) =>
        cardId ? `/items/cards/${cardId}` : '/items/cards',
    list: (listId: string | null) =>
        listId ? `/items/list/${listId}` : '/items/list',
    organization: (orgId: string | null) =>
        orgId ? `/auth/orgs/${orgId}` : '/auth/orgs',
    assignments: (assigmentId: string | null) =>
        assigmentId
            ? `/items/assignments/${assigmentId}`
            : '/items/assignments',

    //email password change
    resetPasswordRequest: `/auth/resetPasswordRequest`,
    requestResetPassword: (uuid: string): string =>
        `/auth/resetPassword/${uuid}`,
    //default password change
    changePassword: '/auth/changePassword',
    tokenValidator: (uuid: string): string => `/auth/tokenValidator/${uuid}`,
    removeMemberFromBoard: (boardId: string) =>
        `/auth/orgs/${boardId}/kickMember`,
    leaveOrganization: (orgId: string) => `/auth/orgs/${orgId}/leave`,
    generateDescription: '/items/generate-description',

    generateAiTemplatedBoard: '/items/createAiTemplatedBoard',
    createBoardFromTemplate: '/items/boards/createFromTemplate',
    saveTemplate: '/items/templates',
};

export const createAiTemplatedBoard = async (title: string, orgId: string) => {
    return api.post(endpoints.generateAiTemplatedBoard, { title, orgId });
};

export const createBoardFromTemplate = async (
    name: string,
    templateId: string,
    orgId: string,
    backgroundUrl: string
) => {
    
    return api.post(endpoints.createBoardFromTemplate, { templateId, name, orgId, backgroundUrl });
};

export const saveTemplate = async (name: string, boardId: string) => {
    return api.post(endpoints.saveTemplate, { name, boardId });
};

// Registers a new user
export const registerUser = async (
    userData: RegisterUserData
): Promise<any> => {
    return api.post(endpoints.registerUser, userData);
};

// Logs in a user
export const loginUser = async (userData: LoginUserData): Promise<any> => {
    return api.post(endpoints.loginUser, userData);
};

// Updates user credentials
export const updateUserCredentials = async (
    userData: UpdateCredentialsData
): Promise<any> => {
    return api.put(endpoints.updateUserCredentials, userData);
};

// Requests password reset
export const requestResetPassword = async (email: string): Promise<any> => {
    return api.post(endpoints.resetPasswordRequest, { email });
};

// Resets the password
export const resetPassword = async (
    uuid: string,
    password: string
): Promise<any> => {
    return api.post(endpoints.requestResetPassword(uuid), {
        newPassword: password,
        token: uuid,
    });
};

// Changes the password
export const changePassword = async (
    oldPassword: string,
    newPassword: string
): Promise<any> => {
    return api.post(endpoints.changePassword, { oldPassword, newPassword });
};

// Validates token
export const tokenValidator = async (uuid: string): Promise<any> => {
    return api.post(endpoints.tokenValidator(uuid));
};

// Creates a new organization
export const createOrganization = async (data: {
    name: string;
    password: string;
}): Promise<any> => {
    return api.post(endpoints.orgs, data);
};

// Joins an organization
export const joinOrganization = async (
    orgId: string,
    password: string
): Promise<any> => {
    return api.post(endpoints.joinOrg(orgId), { password });
};

// Leaves an organization
export const leaveOrganization = async (orgId: string): Promise<any> => {
    return api.post(endpoints.leaveOrganization(orgId));
};

// Deletes an organization
export const deleteOrganization = async (
    orgId: string,
    password: string
): Promise<any> => {
    return api.del(endpoints.organization(orgId), { password });
};

// Updates organization name
export const updateOrganizationName = async (
    orgId: string,
    name: string
): Promise<any> => {
    return api.put(endpoints.organization(orgId), { name });
};

// Updates organization password
export const updateOrganizationPassword = async (
    orgId: string,
    password: string,
    oldPassword: string
): Promise<any> => {
    return api.put(endpoints.organization(orgId), { password, oldPassword });
};

// Gets all organizations
export const getAllOrganizations = async (): Promise<any> => {
    return api.get(endpoints.allOrgs);
};

// Gets user organizations
export const getUserOrganizations = async (): Promise<any> => {
    return api.get(endpoints.orgs);
};

// Creates a new board
export const createBoard = async (data: {
    name: string;
    backgroundUrl: string;
    orgId: string;
}): Promise<any> => {
    return api.post(endpoints.createBoard, data);
};

// Deletes a board
export const deleteBoard = async (boardId: string): Promise<any> => {
    return api.del(endpoints.board(boardId));
};

// Edits a board
export const editBoard = async (
    boardId: string,
    boardName: string
): Promise<any> => {
    return api.put(endpoints.board(boardId), { boardName });
};

// Removes a member from a board
export const removeMemberFromBoard = async (
    boardId: string,
    memberId: string
): Promise<any> => {
    return api.post(endpoints.removeMemberFromBoard(boardId), { memberId });
};

// Changes board background
export const changeBoardBackground = async (
    boardId: string,
    bgUrl: string
): Promise<any> => {
    return api.put(endpoints.board(boardId), { backgroundUrl: bgUrl });
};

// Removes board background
export const removeBoardBackground = async (boardId: string): Promise<any> => {
    return api.post(endpoints.board(boardId), { backgroundUrl: '' });
};

// Gets boards by organization ID
export const getBoardsByOrgId = async (orgId: string): Promise<any> => {
    const queryParams = { populate: 'true' };
    const queryString = new URLSearchParams(queryParams).toString();
    return api.get(`${endpoints.getBoardsByOrg(orgId)}?${queryString}`);
};

// Gets a board by ID
export const getBoardById = async (boardId: string): Promise<dataBaseBoard> => {
    return api.get(endpoints.board(boardId));
};

// Updates a board
export const updateBoard = async (
    boardId: string,
    boardName: string,
    lists: dataBaseList[]
): Promise<any> => {
    const listIds = lists.map((list: dataBaseList) => list._id);
    const cardIds = lists.flatMap((list: dataBaseList) =>
        list.cards.map((card) => card._id)
    );
    return api.put(endpoints.board(boardId), { boardName, listIds, cardIds });
};

// Updates board name
export const updateBoardName = async (
    boardId: string,
    boardName: string
): Promise<any> => {
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

export const changeCardPriority = async (
    cardId: string,
    organizationId: string,
    priority: string
) => {
    return api.put(endpoints.card(cardId), { organizationId, priority });
};

export const updateCard = async (
    cardId: string,
    organizationId: string,
    name: string,
    priority: string,
    dueDate: Date | null,
    description: string
) => {
    return api.put(endpoints.card(cardId), {
        organizationId,
        name,
        priority,
        dueDate,
        description,
    });
};

export const setCardDueDate = async (
    cardId: string,
    organizationId: string,
    dueDate: Date | null
) => {
    return api.put(endpoints.card(cardId), { organizationId, dueDate });
};

export const createAssignment = async (userId: string, cardId: string) => {
    return api.post(endpoints.assignments(null), {
        card: cardId,
        user: userId,
    });
};

export const getAssignments = async () => {
    return api.get(endpoints.assignments(null));
};

export const deleteAssignment = async (assignmentId: string) => {
    return api.del(endpoints.assignments(assignmentId));
};

export const getAssignmentsByCard = async (cardId: string) => {
    return api.get(endpoints.assignments(cardId));
};

export const renameCard = async (
    cardId: string,
    organizationId: string,
    name: string
) => {
    return api.put(endpoints.card(cardId), { organizationId, name });
};

export const generateCardDescription = async (title: string) => {
    return api.post(endpoints.generateDescription, { title });
};

export const deleteList = async (listId: string) => {
    return api.del(endpoints.list(listId));
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
