export interface RegisterUserData {
    firstName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginUserData {
    email: string;
    password: string;
}

export interface UpdateCredentialsData {
    username: string,
    email: string
}

export interface IForgotPassword {
    email: string
}

export interface IResetPassword {
    password: string,
    confirmPassword: string
}

export interface AuthenticationResponse {
    _id: string;
    username: string;
    email: string;
    accessToken: string;
    joinedOrganizations: Array<object>;
}

export interface IUserData {
    _id: string;
    username: string;
    email: string;
    firstName: string;
}

export interface EditingState {
        [key: string]: boolean;
}
