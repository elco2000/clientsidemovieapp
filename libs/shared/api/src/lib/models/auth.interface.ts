export interface IUserCredentials {
    username: string;
    password: string;
}

export interface IUserRegistration extends IUserCredentials {
    name: string;
}

export interface IToken {
    token: string;
}
