// Primero importamos todo lo que necesitamos de Firebase Firestore.
// "collection", "query", "orderBy", "onSnapshot" son cosas que usamos para obtener datos de la base de datos.
// "addDoc" es para agregar un nuevo mensaje a la base de datos.
// "Timestamp" es para guardar la hora en que se envía el mensaje.
import { collection, query, orderBy, onSnapshot, addDoc, Timestamp } from "firebase/firestore";

// Luego, importamos nuestra conexión a la base de datos (Firestore).
import { db } from "../firebase/firebase-chat";

// Función para obtener los mensajes de la base de datos.
// "callback" es una función que nos permite actualizar los mensajes en la pantalla después de obtenerlos.
export const getMessages = (callback: (messages: any[]) => void) => {
  try {
    // Aquí creamos una "consulta" (query) que le dice a Firestore:
    // "Quiero obtener los mensajes de la colección llamada 'messages' y ordenarlos por la hora en que se enviaron (de más antiguo a más reciente)".
    const q = query(collection(db, "messages"), orderBy("Hora", "asc"));

    // Usamos "onSnapshot" para escuchar en tiempo real lo que sucede con los mensajes en Firestore.
    //Cada vez que hay un nuevo mensaje, va a hacer el nuevo llamado
    onSnapshot(q, (querySnapshot) => {
      const messages: any[] = [];

      // Recorremos todos los mensajes
      querySnapshot.forEach((doc) => {
        // Tomamos cada mensaje y lo guardamos en nuestro arreglo de mensajes.
        // "doc.id" es el ID único del mensaje, y "doc.data()" son los datos del mensaje (nombre, texto, hora).
        messages.push({ ID: doc.id, ...doc.data() });
      });
      // Una vez que tenemos todos los mensajes, llamamos a "callback" para que los mensajes se muestren en pantalla.
      callback(messages);
    });
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
  }
};

// Función para enviar un nuevo mensaje a la base de datos.
export const sendMessage = async (message: string) => {
  try {
    // Usamos "addDoc" para agregar un nuevo mensaje a la colección "messages" en Firestore.
    await addDoc(collection(db, "messages"), {
      Nombre: 'Prueba',        // El nombre que pasa el usuario
      Mensaje: message,    // El mensaje que pasa el usuario
      Hora: Timestamp.now(), // La hora actual cuando el mensaje se envía
    });

    console.log("Mensaje enviado correctamente");
  } catch (error) {
    // Si hay algún problema al enviar el mensaje, mostramos un error en la consola.
    console.error("Error al enviar mensaje:", error);
  }
};

