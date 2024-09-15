"use client";
import React, { useEffect, useState } from "react";
import { getMessages, sendMessage } from "../api/services/chat";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

   // Dentro de useEffect, llamamos a la función getMessages para obtener todos los mensajes del chat y actualizamos el estado 'messages'.
   useEffect(() => {
    getMessages(setMessages); // Llama a getMessages y pasa setMessages como el "callback" para actualizar los mensajes en la pantalla.
  }, []); // [] indica que esto solo debe ejecutarse una vez, al inicio (cuando el componente se monta).
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && message) {
      await sendMessage(name, message); // Enviar mensaje
      // Limpiar campos
      setMessage(""); 
      setName("");
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>

      {/* Mostrar y recorrer mensajes */}
      <div>
        {messages.map((message) => (
          <div key={message.ID}>
            <p><strong>{message.Nombre}</strong>: {message.Mensaje}</p>
            <span>{new Date(message.Hora.seconds * 1000).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
