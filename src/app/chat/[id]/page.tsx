"use client";
import React, { useEffect, useState, useRef } from "react";
import { getMessages, sendMessage } from "../../api/services/chat";
import { FaRegHeart, FaMapPin, FaPhoneAlt } from "react-icons/fa";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import styles from './chat.module.scss';
import Form from "../../../components/UI/form/Form";
import Label from "../../../components/UI/label/Label";
import TextArea from "../../../components/UI/textarea/TextArea";
import Button from "../../../components/UI/button/Button";
import { useParams } from 'next/navigation';


const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const hospitalId = Array.isArray(id) ? id[0] : id;

    if (hospitalId) {
      console.log("Hospital ID:", hospitalId); // Verifica el ID
      getMessages(setMessages, hospitalId); // Llama a getMessages con el ID
    }
  }, [id]); // Escucha cambios en id

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // Desplazarse al final del contenedor
    }
  }, [messages]); // Se ejecuta cuando un mensaje se envíe 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message) {
      const hospitalId = Array.isArray(id) ? id[0] : id;
      await sendMessage(message, hospitalId); 
      setMessage("");
    }
  };

  const handleChangeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatInformation}>
        <div className={styles.hospitalBanner}>
          <div className={styles.hospitalDescription}>
            <h1>Hospital Pablo Tóbón Uribe</h1>
            <p>Un centro de excelencia médica y calidez humana. Desde nuestra fundación, nos hemos dedicado a brindar atención de salud integral, combinando tecnología avanzada con un trato compasivo y personalizado.</p>
          </div>
          <div className={styles.hospitalImage}>
            <img className={styles.img} src="https://cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/ZUCFKCZCZJFUHEGZIXW46MZCKM.jpg" />
          </div>
        </div>
        <div className={styles.chatMessagesContainer}>
          <div className={styles.chatMessages}>
            <div>
              <h2 className={styles.chatTitle}>Entérate de lo que está sucediendo en la sede:</h2>
            </div>
            <div ref={containerRef} className={styles.containerRef}>
            {messages.length > 0 ? (
  messages.map((message) => (
    <div className={styles.chatMessage} key={message.ID}>
      <div className={styles.containerLeft}>
        <p className={styles.name}><strong>{message.Nombre}</strong></p>
        <p>{message.Mensaje}</p>
      </div>
      <span className={styles.date}>{new Date(message.Hora.seconds * 1000).toLocaleString()}</span>
    </div>
  ))
) : (
  <p>No hay mensajes disponibles.</p>
)}
            </div>
          </div>
          <div className={styles.informationContainer}>
            <div className={styles.hospitalInformation}>
              <div className={styles.card}>
                <div className={styles.iconInformation}>
                  <Button className={styles.informationButton}><FaRegHeart className={styles.iconDescription} /></Button>
                  <p>EPS</p>
                </div>

                <div className={styles.iconInformation}>
                  <Button className={styles.informationButton}><FaMapPin className={styles.iconDescription} /></Button>
                  <p>Ubicación</p>
                </div>

                <div className={styles.iconInformation}>
                  <Button className={styles.informationButton}><BiSolidBarChartAlt2 className={styles.iconDescription} /></Button>
                  <p>Concurrencia</p>
                </div>

                <div className={styles.iconInformation}>
                  <Button className={styles.informationButton}><FaPhoneAlt className={styles.iconDescription} /></Button>
                  <p>3218825621</p>
                </div>
              </div>
            </div>
            <div className={styles.formContainer}>
              <Form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Escribe un comentario</h2>
                <div className={styles.formElement}>
                  <Label
                    htmlFor="message"
                    className={styles.label}
                  >Mensaje:</Label>
                  <TextArea
                    id='message'
                    value={message}
                    onChange={handleChangeMessage}
                    rows={5}
                    cols={50}
                    maxLength={200}
                    className={styles.textarea}
                  />
                </div>
                <div className={styles.formElement}>
                  <Button className={styles.chatButton} type="submit">
                    Enviar
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
