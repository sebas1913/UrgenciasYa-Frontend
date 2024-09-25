import { collection, query, orderBy, onSnapshot, addDoc, Timestamp, where } from "firebase/firestore";
import { db } from "../firebase/firebase-chat";
import { IUserInformation } from "@/interfaces/IUser";
import cookie from 'cookie';
import { URL_BASE } from "@/config/apiConfig";

// Services and functions for firebase hospital's chats. 

export const getMessages = (callback: (messages: any[]) => void, id: string) => {
	try {

		// Query to Firestore, filtering by hospital ID and sorting by “Time”.
		const q = query(
			collection(db, "messages"),
			where("hospitalId", "==", id), // ID hospital
			orderBy("Hora", "asc")
		);

		// Listen to messages in real time.
		onSnapshot(q, (querySnapshot) => {
			const messages: any[] = [];

			querySnapshot.forEach((doc) => {
				// We take each message and store it in our message array.
				messages.push({ ID: doc.id, ...doc.data() });
			});

			console.log(messages);

			callback(messages);
		});
	} catch (error) {
		console.error("Error al obtener mensajes:", error);
	}
};

// Function to send menssages to firebase with the user's information. 

export const sendMessage = async (message: string, hospitalId: string) => {
	const responseID = localStorage.getItem('userID');

	const cookies = cookie.parse(document.cookie || '');
	const token = cookies.auth;

	if (responseID) {
		try {
			const userID = JSON.parse(responseID);
			try {
				const response: Response = await fetch(`${URL_BASE}/api/v1/users/${userID.id}`, {
					method: 'GET',
					headers: {
						'accept': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				});

				const data: IUserInformation = await response.json();

				await addDoc(collection(db, "messages"), {
					Nombre: `${data.name}`,
					Mensaje: message,
					Hora: Timestamp.now(),
					hospitalId,
				});

				console.log("Mensaje enviado correctamente");

			} catch (error) {
				console.error("Error al enviar mensaje:", error);
			}
		} catch (error) {
			console.error(`No se pudo realizar la petición: ${error}`);
		}
	}
};