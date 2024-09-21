export interface IHospital {
    id: number;
    name: string;           
    phone_number: string;   
    howtogetthere?: string;  
    rating: string | number;        
    url_image: string; 
    nameTown : string; 
    town_id?: ITownID;  
};

interface ITownID {
    name : string;
}