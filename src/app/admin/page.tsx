"use client";
import React, { useEffect, useState } from "react";
import cookie from 'cookie';
import { URL_BASE } from "@/config/apiConfig";

const cookies = cookie.parse(document.cookie || '');
const token = cookies.auth;

// interface Eps {
//     name: string;
// }

// interface Hospital {
//     id: number;
//     name: string;
//     town_id: {
//         name: string; // Ciudad
//     };
// }

// interface User {
//     id: number;
//     name: string;
//     email: string; // Mantienes este campo aunque no se muestre en la tabla
//     document: string;
// }


// interface Town {
//     id: number;
//     name: string; // Asumiendo que la ciudad tiene un nombre
// }

const Admin: React.FC = () => {
    //     const [epsList, setEpsList] = useState<Eps[]>([]);
    //     const [hospitalsList, setHospitalsList] = useState<Hospital[]>([]);
    //     const [usersList, setUsersList] = useState<User[]>([]);
    //     const [townsList, setTownsList] = useState<Town[]>([]);

    //     //

    //     useEffect(() => {
    //         const fetchEps = async () => {
    //             try {
    //                 const response = await fetch(`${URL_BASE}/api/v1/eps/getAll`, {
    //                     headers: {
    //                         'Authorization': `Bearer ${token}`
    //                     }
    //                 });
    //                 if (!response.ok) {
    //                     throw new Error("Error al obtener las EPS");
    //                 }
    //                 const data: Eps[] = await response.json();
    //                 setEpsList(data);
    //             } catch (error) {
    //                 console.error("Error fetching EPS data:", error);
    //             }
    //         };

    //         const fetchHospitals = async () => {
    //             try {
    //                 const response = await fetch(`${URL_BASE}/api/v1/hospitals/all`, {
    //                     headers: {
    //                         'Authorization': `Bearer ${token}`
    //                     }
    //                 });
    //                 if (!response.ok) {
    //                     throw new Error("Error al obtener los hospitales");
    //                 }
    //                 const data: Hospital[] = await response.json();
    //                 setHospitalsList(data);
    //             } catch (error) {
    //                 console.error("Error fetching hospitals data:", error);
    //             }
    //         };

    //         const fetchUsers = async () => {
    //             try {
    //                 const response = await fetch(`${URL_BASE}/api/v1/users`, {
    //                     headers: {
    //                         'Authorization': `Bearer ${token}`
    //                     }
    //                 });
    //                 if (!response.ok) {
    //                     throw new Error("Error al obtener los usuarios");
    //                 }
    //                 const data: User[] = await response.json();
    //                 setUsersList(data);
    //             } catch (error) {
    //                 console.error("Error fetching users data:", error);
    //             }
    //         };

    //         const fetchTowns = async () => {
    //             try {
    //                 const response = await fetch(`${URL_BASE}/api/v1/towns/getAll`, {
    //                     headers: {
    //                         'Authorization': `Bearer ${token}`
    //                     }
    //                 });
    //                 if (!response.ok) {
    //                     throw new Error("Error al obtener las ciudades");
    //                 }
    //                 const data: Town[] = await response.json();
    //                 setTownsList(data);
    //             } catch (error) {
    //                 console.error("Error fetching towns data:", error);
    //             }
    //         };

    //         fetchEps();
    //         fetchHospitals();
    //         fetchUsers();
    //         fetchTowns();
    //     }, []);

    //     const deleteEps = async (epsId: string) => {
    //         try {
    //             const response = await fetch(`${URL_BASE}/api/v1/eps/delete/${epsId}`, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'application/json'
    //                 }
    //             });
    //             if (!response.ok) {
    //                 throw new Error("Error al eliminar la EPS");
    //             }
    //             setEpsList((prev) => prev.filter((eps) => eps.name !== epsId));
    //         } catch (error) {
    //             console.error("Error deleting EPS:", error);
    //         }
    //     };

    //     const deleteHospital = async (hospitalId: number) => {
    //         try {
    //             const response = await fetch(`${URL_BASE}/api/v1/hospitals/delete/${hospitalId}`, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'application/json'
    //                 }
    //             });
    //             if (!response.ok) {
    //                 throw new Error("Error al eliminar el hospital");
    //             }
    //             setHospitalsList((prev) => prev.filter((hospital) => hospital.id !== hospitalId));
    //         } catch (error) {
    //             console.error("Error deleting hospital:", error);
    //         }
    //     };

    //     const deleteUser = async (userId: number) => {
    //         try {
    //             const response = await fetch(`${URL_BASE}/api/v1/users/${userId}`, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'application/json'
    //                 }
    //             });
    //             if (!response.ok) {
    //                 const errorData = await response.json();
    //                 throw new Error(`Error al eliminar el usuario: ${errorData.message || response.statusText}`);
    //             }
    //             setUsersList((prev) => prev.filter((user) => user.id !== userId));
    //         } catch (error) {
    //             console.error("Error deleting user:");
    //             alert(`Error al eliminar el usuario`);
    //         }
    //     };

    //     const deleteTown = async (townId: number) => {
    //         try {
    //             const response = await fetch(`${URL_BASE}/api/v1/towns/delete/${townId}`, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'application/json'
    //                 }
    //             });
    //             if (!response.ok) {
    //                 throw new Error("Error al eliminar la ciudad");
    //             }
    //             setTownsList((prev) => prev.filter((town) => town.id !== townId));
    //         } catch (error) {
    //             console.error("Error deleting town:", error);
    //         }
    //     };

    return (
        // <div>
        //     <h1>Administrador</h1>

        //     <h2>Lista de hospitales</h2>
        //     <table>
        //         <thead>
        //             <tr>
        //                 <th style={{ textAlign: 'center' }}>Nombre</th>
        //                 <th style={{ textAlign: 'center' }}>Ciudad</th>
        //                 <th style={{ textAlign: 'center' }}>Acciones</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {hospitalsList.length > 0 ? (
        //                 hospitalsList.map((hospital) => (
        //                     <tr key={hospital.id}>
        //                         <td style={{ textAlign: 'center' }}>{hospital.name}</td>
        //                         <td style={{ textAlign: 'center' }}>{hospital.town_id.name}</td>
        //                         <td style={{ textAlign: 'center' }}>
        //                             <button onClick={() => deleteHospital(hospital.id)}>Eliminar</button>
        //                         </td>
        //                     </tr>
        //                 ))
        //             ) : (
        //                 <tr>
        //                     <td colSpan={3} style={{ textAlign: 'center' }}>Cargando hospitales...</td>
        //                 </tr>
        //             )}
        //         </tbody>
        //     </table>

        //     <h2 style={{ textAlign: 'center' }}>EPS</h2>
        //     <table>
        //         <thead>
        //             <tr>
        //                 <th style={{ textAlign: 'center' }}>EPS</th>
        //                 <th style={{ textAlign: 'center' }}>Acciones</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {epsList.length > 0 ? (
        //                 epsList.map((eps, index) => (
        //                     <tr key={index}>
        //                         <td style={{ textAlign: 'center' }}>{eps.name}</td>
        //                         <td style={{ textAlign: 'center' }}>
        //                             <button onClick={() => deleteEps(eps.name)}>Eliminar</button>
        //                         </td>
        //                     </tr>
        //                 ))
        //             ) : (
        //                 <tr>
        //                     <td colSpan={2} style={{ textAlign: 'center' }}>Cargando EPS...</td>
        //                 </tr>
        //             )}
        //         </tbody>
        //     </table>

        //     <h2 style={{ textAlign: 'center' }}>Lista de usuarios</h2>
        //     <table>
        //         <thead>
        //             <tr>
        //                 <th style={{ textAlign: 'center' }}>Nombre</th>
        //                 <th style={{ textAlign: 'center' }}>Email</th>
        //                 <th style={{ textAlign: 'center' }}>Acciones</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {usersList.length > 0 ? (
        //                 usersList.map((user) => (
        //                     <tr key={user.document}> {/* Cambié key a user.document */}
        //                         <td>{user.id}</td>
        //                         <td>{user.name}</td>
        //                         <td>{user.document}</td>
        //                         <td>
        //                             <button onClick={() => deleteUser(user.id)}>Eliminar</button>
        //                         </td>
        //                     </tr>
        //                 ))
        //             ) : (
        //                 <tr>
        //                     <td colSpan={4} style={{ textAlign: 'center' }}>Cargando usuarios...</td>
        //                 </tr>
        //             )}
        //         </tbody>

        //     </table>

        //     <h2 style={{ textAlign: 'center' }}>Lista de ciudades</h2>
        //     <table>
        //         <thead>
        //             <tr>
        //                 <th style={{ textAlign: 'center' }}>Ciudad</th>
        //                 <th style={{ textAlign: 'center' }}>Acciones</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {townsList.length > 0 ? (
        //                 townsList.map((town) => (
        //                     <tr key={town.id}>
        //                         <td style={{ textAlign: 'center' }}>{town.name}</td>
        //                         <td style={{ textAlign: 'center' }}>
        //                             <button onClick={() => deleteTown(town.id)}>Eliminar</button>
        //                         </td>
        //                     </tr>
        //                 ))
        //             ) : (
        //                 <tr>
        //                     <td colSpan={2} style={{ textAlign: 'center' }}>Cargando ciudades...</td>
        //                 </tr>
        //             )}
        //         </tbody>
        //     </table>
        // </div>
        <h1>Pagina de Administrador (en progreso)</h1>
    );
}

export default Admin;
