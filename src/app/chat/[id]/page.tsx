"use client";
import React, { useEffect, useState, useRef } from "react";
import { getMessages, sendMessage } from "../../api/services/chat";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCalendarCheck, FaLocationDot, FaRegCircleCheck } from "react-icons/fa6";
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
import Modal from "@/components/modal/Modal";
import MapComponent from "@/components/map/Map";
import { jsPDF } from 'jspdf';
import emailjs from 'emailjs-com';
import DynamicHourChart from "@/components/afluency/afluency";
import { URL_BASE } from "@/config/apiConfig";

export let latitudeHospital: number | null | undefined = null;
export let longitudeHospital: number | null | undefined = null;

const Chat: React.FC = () => {

	// useStates hooks needed for implementing the code.

	const [messages, setMessages] = useState<any[]>([]);
	const [message, setMessage] = useState("");
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [userInfo, setUserInfo] = useState<IUserInformation | null>(null);
	const [hospitalInformation, setHospitalInformation] = useState<IHospital | null>(null);
	const [isAlertSuccess, setAlertSuccess] = useState(false);
	const [isAlertError, setAlertError] = useState(false);
	const [generatedShift, setGeneratedShift] = useState<any>(null); 
	const [isModalVisible, setModalVisible] = useState(false);
	const [isAfluencyModalVisible, setAfluencyModalVisible] = useState(false);

	// Functions for switching the useState hooks.

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const { id } = useParams();
	console.log(id);

	const toggleAlertSuccess = () => {
		setAlertSuccess(!isAlertSuccess);
	};

	const toggleAlertError = () => {
		setAlertError(!isAlertError);
	};

	const toggleModalAfluency = () => {
		setAfluencyModalVisible(!isAfluencyModalVisible);
	};

	const cookies = cookie.parse(document.cookie || '');
	const token = cookies.auth;

	// Autorun function to load a hospital information.

	useEffect(() => {
		const fetchHospital = async () => {

			if (id) {

				try {
					const response: Response = await fetch(`${URL_BASE}/api/v1/hospitals/${id}`, {
						headers: {
							'accept': 'application/json',
							'Authorization': `Bearer ${token} `
						}
					});

					const data: IHospital = await response.json();
					setHospitalInformation(data);
					console.log(data.concurrencyProfile)

					longitudeHospital = data.longitude;
					latitudeHospital = data.latitude;

				} catch (error) {
					console.error(`No se pudo realizar la petición: ${error}`);
				}
			}
		}
		fetchHospital();
	}, [id]);

	useEffect(() => {
		const hospitalId = Array.isArray(id) ? id[0] : id;

		if (hospitalId) {
			console.log("Hospital ID:", hospitalId); // Verify hospital ID.
			getMessages(setMessages, hospitalId); // Calls the function to get the messages from an specific hospital by its ID.
		}
	}, [id]); // Listener.


	// Chat functionality, scroll to the end of container when sending a new message.

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			container.scrollTop = container.scrollHeight; 
		}
	}, [messages]); // It runs when a message is sent.

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
				const response: Response = await fetch(`${URL_BASE}/api/v1/users/${userID.id}`, {
					method: 'GET',
					headers: {
						'accept': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				});

				const data: IUserInformation = await response.json();
				setUserInfo(data);

				const userDocument = data.document;
				const userEps = data.eps.id;
				const userEmail = data.email; // User email.
				const hospitalId = Array.isArray(id) ? id[0] : id;

				if (userDocument && userEps && hospitalId) {
					const shiftResponse: Response = await fetch(`${URL_BASE}/api/v1/shifts/create?document=${encodeURIComponent(userDocument)}&hospitalId=${encodeURIComponent(hospitalId)}&epsId=${encodeURIComponent(userEps)}`, {
						method: 'POST',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'
						}
					});

					const shiftData = await shiftResponse.json();
					setGeneratedShift(shiftData); // Save the shift.
					setAlertSuccess(true);

					// Send email function.
					sendEmail(shiftData, data.email); // Shift information.
				} else {
					console.error('Faltan datos para crear el turno.');
				}

			} catch (error) {
				console.error(`No se pudo realizar la petición: ${error}`);
			}
		} else {
			console.error('No se encontró el ID del usuario en localStorage.');
		}
	};


	const sendEmail = (shiftData: any, recipientEmail: string) => {
		const templateParams = {
			destinatarioEmail: 'diegomejiasobsu@gmail.com',  // Test email (temporarily).
			shiftId: shiftData.id,
			shiftNumber: shiftData.shiftNumber,
			estimatedTime: shiftData.estimatedTime,
			status: shiftData.status,
			userId: shiftData.userId,
			hospitalId: shiftData.hospitalId,
			epsId: shiftData.epsId,
		};

		emailjs.send("service_Urg3nci4sY4", "template_bked83i", templateParams, "tFwtcqbxOv1yYEl3A")
			.then((response) => {
				console.log("Email sent successfully!", response.status, response.text);
			})
			.catch((err) => {
				console.error("Failed to send email. Error: ", err);
			});
	};

	const generatePDF = (shiftData: any) => {
		const doc = new jsPDF();
		doc.text(`Shift ID: ${shiftData.id}`, 10, 10);
		doc.text(`Shift Number: ${shiftData.shiftNumber}`, 10, 20);
		doc.text(`Estimated Time: ${shiftData.estimatedTime}`, 10, 30);
		doc.text(`Status: ${shiftData.status}`, 10, 40);
		doc.text(`User ID: ${shiftData.userId}`, 10, 50);
		doc.text(`Hospital ID: ${shiftData.hospitalId}`, 10, 60);
		doc.text(`EPS ID: ${shiftData.epsId}`, 10, 70);

		// Download the PDF file with the shift infotmation.
		doc.save('shift_details.pdf');
	};

	useEffect(() => {
		if (generatedShift) {
			generatePDF(generatedShift); 
		}
	}, [generatedShift]); 

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
										<Button className={styles.informationButton} onClick={toggleModal}><FaLocationDot className={styles.iconDescription} /></Button>
										<p>{hospitalInformation?.town_id?.name}</p>
										<Modal isVisible={isModalVisible} onClose={toggleModal}>
											<MapComponent />
										</Modal>
									</div>

									<div className={styles.iconInformation}>
										<Button className={styles.informationButton} onClick={toggleModalAfluency}><BiSolidBarChartAlt2 className={styles.iconDescription} /></Button>
										<p>Concurrencia</p>
										{hospitalInformation && hospitalInformation.concurrencyProfile && (
											<Modal isVisible={isAfluencyModalVisible}
												onClose={toggleModalAfluency}>
												<div className={styles.title}>
													<h1>Concurrencia</h1>
												</div>
												<DynamicHourChart
													hourData={hospitalInformation.concurrencyProfile}
												/>
											</Modal>
										)}
									</div>

									<div className={styles.iconInformation}>
										<Button className={`${styles.informationButton} ${styles.exception}`}><FaPhoneAlt className={styles.iconDescription} /></Button>
										<p>{hospitalInformation?.phone_number}</p>
									</div>

									<div className={styles.shift}>
										<Button className={styles.shiftButton}><FaCalendarCheck className={styles.iconDescription} onClick={shift} /></Button>
										<p className={styles.text}>Agendar un turno</p>
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
										<Button className={styles.chatButton} type="submit">Enviar</Button>
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
				title='Solicitud aprobada'
				description='Tu turno ha sido generado exitosamente. En tu perfil encontrarás la información.'
			/>
		</>
	);
}

export default Chat;
