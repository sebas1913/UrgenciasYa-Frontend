// src/context/AuthContext.tsx
export interface IUser {
    id : number;
};

export interface IUserInformation {
    name: string;
    email: string;
    eps: IEPS;
    document: string;
    number? : string;
};

export interface IEPS {
    id: number;
    name: string;
};