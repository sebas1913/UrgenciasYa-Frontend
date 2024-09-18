import { collection, query, orderBy, onSnapshot, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase-chat";

//Traer mensajes
export const getMessages = (callback: (messages: any[]) => void) => {
  try {
    // Query al firestore
    const q = query(collection(db, "messages"), orderBy("Hora", "asc"));

    // "onSnapshot" para escuchar en tiempo real lo que sucede con los mensajes en Firestore.
    onSnapshot(q, (querySnapshot) => {
      const messages: any[] = [];

      querySnapshot.forEach((doc) => {
        // Tomamos cada mensaje y lo guardamos en nuestro arreglo de mensajes.
        // "doc.id" es el ID del mensaje y data lo que lleva el mensaje
        messages.push({ ID: doc.id, ...doc.data() });
      });
      // callback muestra todos los mensajes
      callback(messages);
    });
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
  }
};

// Fución para enviar mensaje
export const sendMessage = async (message: string) => {
  try {
    // Usamos "addDoc" para un nuevo mensaje
    await addDoc(collection(db, "messages"), {
      Nombre: 'Prueba',       
      Mensaje: message,   
      Hora: Timestamp.now(), 
    });

    console.log("Mensaje enviado correctamente");
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
};

