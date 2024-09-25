export interface IUser {
    id : number;
    role? : number;
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

export interface IHospitalID {
    id: number;
    name: string;
};

export interface IUserShift {
    id: number;
    shiftNumber: string;
    estimatedTime: string;
    status: string;
    user: IUserInformation;
    hospitalId: IHospitalID;
    epsId: IEPS;

};