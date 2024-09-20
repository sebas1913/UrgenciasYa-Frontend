import { collection, query, orderBy, onSnapshot, addDoc, Timestamp, where } from "firebase/firestore";
import { db } from "../firebase/firebase-chat";

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
  try {
    await addDoc(collection(db, "messages"), {
      Nombre: 'Prueba',       
      Mensaje: message,   
      Hora: Timestamp.now(),
      hospitalId, // Aquí se agrega el hospitalId
    });

    console.log("Mensaje enviado correctamente");
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
};

