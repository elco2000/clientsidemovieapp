export enum UserRole {
    Guest = 'Guest',
    Admin = 'Admin',
    Unknown = 'Unknown'
}

export interface IUserIdentity {
    id: string;
    username: string;
    password: string;
    role: UserRole;
    token?: string;
}

export interface IUserInfo {
    id: string;
    username: string;
    password: string;
    birthdate: string;
    country: string;
    description?: string;
}

export interface IUser {
    id: string;
    username: string;
    birthdate: string;
    country: string;
    description?: string;
}

export type ICreateUser = Pick<IUserInfo, 'username' | 'password' | 'birthdate' | 'country' | 'description'>;
export type IUpdateUser = Partial<Omit<IUserInfo, 'id'>>;
export type IUpsertUser = IUserInfo;
