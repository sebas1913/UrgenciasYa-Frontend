"use client";
import React, { useEffect, useState, useRef } from "react";
import { getMessages, sendMessage } from "../../api/services/chat";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCalendarCheck, FaLocationDot } from "react-icons/fa6";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import styles from './chat.module.scss';
import Form from "../../../components/UI/form/Form";
import Label from "../../../components/UI/label/Label";
import TextArea from "../../../components/UI/textarea/TextArea";
import Button from "../../../components/UI/button/Button";
import { useParams } from 'next/navigation';
import cookie from 'cookie';
import { IHospital } from "@/interfaces/IHospital";
import { IUserInformation } from "@/interfaces/IUser";
import Alert from "@/components/UI/alert/Alert";
import { FaRegCircleCheck } from "react-icons/fa6";
import { TiWarningOutline } from "react-icons/ti";


const Chat: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState("");
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [userInfo, setUserInfo] = useState<IUserInformation | null>(null);
    const [hospitalInformation, setHospitalInformation] = useState<IHospital | null>(null); // Estado para almacenar la información del usuario
    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [isAlertError, setAlertError] = useState(false);


    const { id } = useParams();
    console.log(id);

    const toggleAlertSuccess = () => {
        setAlertSuccess(!isAlertSuccess);
    };

    const toggleAlertError = () => {
        setAlertError(!isAlertError);
    };


    const cookies = cookie.parse(document.cookie || '');
    const token = cookies.auth;

    useEffect(() => {
        const fetchHospital = async () => {

            if (id) {

                try {
                    const response: Response = await fetch(`http://localhost:8080/api/v1/hospitals/${id}`, {
                        headers: {
                            'accept': 'application/json',
                            'Authorization': `Bearer ${token} `
                        }
                    });

                    const data: IHospital = await response.json();
                    setHospitalInformation(data);
                    console.log(data.town_id?.name)

                } catch (error) {
                    console.error(`No se pudo realizar la petición: ${error}`);
                }
            }
        }
        fetchHospital();
    }, []);


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

    const shift = async () => {

        const responseID = localStorage.getItem('userID');

        if (responseID) {
            const userID = JSON.parse(responseID);
            try {
                const response: Response = await fetch(`http://localhost:8080/api/v1/users/${userID.id}`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data: IUserInformation = await response.json();
                setUserInfo(data);

                const userDocument = data.document; // Cambiar a data
                const userEps = data.eps.id; // Cambiar a data
                const hospitalId = Array.isArray(id) ? id[0] : id;

                if (userDocument && userEps && hospitalId) {
                    const shiftResponse: Response = await fetch(`http://localhost:8080/api/v1/shifts/create?document=${encodeURIComponent(userDocument)}&hospitalId=${encodeURIComponent(hospitalId)}&epsId=${encodeURIComponent(userEps)}`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json' // Asegúrate de que el tipo de contenido sea correcto
                        }
                    });

                    const shiftData = await shiftResponse.json(); // Espera la respuesta
                    console.log(shiftData);
                    setAlertSuccess(true);


                } else {
                    console.error('Faltan datos para crear el turno.');

                }

            } catch (error) {
                console.error(`No se pudo realizar la petición: ${error}`);
            }
        } else {
            console.error('No se encontró el ID del usuario en localStorage.');
        }
    }


    return (
        <>
            <div className={styles.chatContainer}>
                <div className={styles.chatInformation}>
                    <div className={styles.hospitalBanner}>
                        <div className={styles.hospitalDescription}>
                            <h1>{hospitalInformation?.name}</h1>
                            <p className={styles.text}>En <b>Urgencias Ya</b>, sabemos lo vital que es para ti estar informado sobre el servicio en cada sede de atención.</p>
                        </div>
                        <div className={styles.hospitalImage}>
                            <img className={styles.img} src={hospitalInformation?.url_image} />
                        </div>
                    </div>
                    <div className={styles.chatMessagesContainer}>
                        <div className={styles.chatMessages}>
                            <div>
                                <h2 className={styles.chatTitle}>Entérate de lo que está sucediendo:</h2>
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
                                        <a href={hospitalInformation?.howtogetthere} target="_blank" rel="noopener noreferrer"><Button className={styles.informationButton}><FaLocationDot className={styles.iconDescription} /></Button>
                                        </a>
                                        <p>{hospitalInformation?.town_id?.name}</p>
                                    </div>

                                    <div className={styles.iconInformation}>
                                        <Button className={styles.informationButton}><BiSolidBarChartAlt2 className={styles.iconDescription} /></Button>
                                        <p>Concurrencia</p>
                                    </div>

                                    <div className={styles.iconInformation}>
                                        <Button className={`${styles.informationButton} ${styles.exception}`}><FaPhoneAlt className={styles.iconDescription} /></Button>
                                        <p>{hospitalInformation?.phone_number}</p>
                                    </div>

                                    <div className={styles.iconInformation}>
                                        <Button className={styles.informationButton}><FaCalendarCheck className={styles.iconDescription} onClick={shift} /></Button>
                                        <p>Agendar un turno</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.formContainer}>
                                <Form className={styles.form} onSubmit={handleSubmit}>
                                    <h2 className={styles.title}>Participa del chat</h2>
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
            <Alert
                isVisible={isAlertSuccess}
                onClose={toggleAlertSuccess}
                icono={< FaRegCircleCheck />}
                title='Solicitud exitosa'
                description='Tu turno ha sido generado'
            />
        </>
    );
}

export default Chat;
