export interface IHospital {
    id: number;
    name: string;
    phone_number: string;
    howtogetthere?: string;
    rating: number;
    url_image: string;
    nameTown: string;
    town_id?: ITownID;
    concurrencyProfile: HourData;
    latitude?: number;
    longitude?: number;
};

interface ITownID {
    name: string;
};

export interface HourData {
    [key: string]: any;
}