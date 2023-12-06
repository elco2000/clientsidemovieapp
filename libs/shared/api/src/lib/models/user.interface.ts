import { IUserRegistration } from './auth.interface';

export enum UserRole {
    Guest = 'Guest',
    Admin = 'Admin',
    Unknown = 'Unknown'
}

/**
 * Minimal user information
 */

export interface IUserIdentity {
    id: string;
    username: string;
    password: string;
    role: UserRole;
    token?: string;
}

/**
 * All user information, excl. domain entities
 */
export interface IUserInfo extends IUserRegistration {
    id: string;
    username: string;
    password: string;
    birthdate: string;
    country: string;
    description?: string;
}

export type ICreateUser = Pick<IUserInfo, 'username' | 'password' | 'birthdate' | 'country' | 'description'>;
export type IUpdateUser = Partial<Omit<IUserInfo, 'id'>>;
export type IUpsertUser = IUserInfo;
