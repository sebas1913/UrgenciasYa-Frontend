import { collection, query, orderBy, onSnapshot, addDoc, Timestamp, where } from "firebase/firestore";
import { db } from "../firebase/firebase-chat";
import { IUserInformation } from "@/interfaces/IUser";
import cookie from 'cookie';



// Traer mensajes filtrados por ID del hospital
export const getMessages = (callback: (messages: any[]) => void, id: string) => {
  try {
    // Query a Firestore, filtrando por el ID del hospital y ordenando por "Hora"
    const q = query(
      collection(db, "messages"),
      where("hospitalId", "==", id), // Filtra por el ID del hospital
      orderBy("Hora", "asc")
    );

    // Escuchar los mensajes en tiempo real
    onSnapshot(q, (querySnapshot) => {
      const messages: any[] = [];

      querySnapshot.forEach((doc) => {
        // Tomamos cada mensaje y lo guardamos en nuestro arreglo de mensajes.
        messages.push({ ID: doc.id, ...doc.data() });
      });

      console.log(messages);

      callback(messages);
    });
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
  }
};

// Función para enviar mensaje
// Función para enviar mensaje
export const sendMessage = async (message: string, hospitalId: string) => {
  const responseID = localStorage.getItem('userID');

  const cookies = cookie.parse(document.cookie || '');
  const token = cookies.auth;

  if (responseID) {
    try {
      const userID = JSON.parse(responseID);
      try {
        const response: Response = await fetch(`Https://urgenciasya-frontend-3.onrender.com/api/v1/users/${userID.id}`, {
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
          hospitalId, // Aquí se agrega el hospitalId
        });

        console.log("Mensaje enviado correctamente");
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    } catch (error) {
      console.error(`No se pudo realizar la petición: ${error}`);
    }
  }
}