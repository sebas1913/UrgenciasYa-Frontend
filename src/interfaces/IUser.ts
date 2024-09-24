// src/context/AuthContext.tsx
export interface IUser {
    id : number;
};

export interface IUserInformation {
    name: string;
    email: string;
    eps: IEPS;
    document: string;
    contact?: IEmergency;
};

export interface IEPS {
    id: number;
    name: string;
};

export interface IEmergency{
    id: number;
    name: string;
    phone: string;
};