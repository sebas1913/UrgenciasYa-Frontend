"use client";
import React, { useEffect } from "react";
import styles from "./profile-user.module.scss";
import Button from "../../components/UI/button/Button";
import { useState } from "react";
import Modal from "@/components/modal/Modal";
import { FaRegHeart, FaIdCard, FaRegEnvelope, FaPhoneAlt, FaUserMd, FaLock } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import UpdateUserForm from "@/components/user-form/user-form";
import { IUserInformation } from "@/interfaces/IUser";
import cookie from 'cookie';
import EmergencyContact from "@/components/emergency-form/emergency-form";
import PasswordForm from "@/components/password-form/password-form";


const Profile = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isEmergencyModalVisible, setEmergencyModalVisible] = useState(false);
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
    const [userInfo, setUserInfo] = useState<IUserInformation | null>(null); // Estado para almacenar la información del usuario

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleModalEmergency = () => {
        setEmergencyModalVisible(!isEmergencyModalVisible)
    }

    const toggleModalPassword = () => {
        setPasswordModalVisible(!isPasswordModalVisible)
    }

    const cookies = cookie.parse(document.cookie || '');
    const token = cookies.auth;
    

    useEffect(() => {

        const responseID = localStorage.getItem('userID');

        const fetchUser = async () => {

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

                } catch (error) {
                    console.error(`No se pudo realizar la petición: ${error}`);
                }
            }
        }
        fetchUser();
    }, []);

    return (
        <>
            <div className={styles.profileContainer}>
                <div className={styles.profileInformation}>
                    <div className={styles.information}>
                        <div className={styles.welcome}>
                            <h1 className={styles.profileTitle}>¡Hola, {userInfo?.name.split(' ')[0]}!</h1>
                            <div className={styles.welcomeInformation}>
                                <p>Al autenticarte tienes nuevas opciones de accesbilidad. Ahora, al darle click al botón, puedes realizar tu <b>búsqueda</b> de manera autmática.</p>
                                <br />
                                <p>¡También puedes participar de los <b>chats grupales </b>de cada hospital y solicitar un <b>turno</b>!</p>
                            </div>
                            <div className={styles.containerButton}>
                                <Button className={styles.searchButton} type="button">Realizar búsqueda</Button>
                            </div>
                        </div>
                        <div className={styles.tickets}>
                            <h1 className={styles.ticketTitle}>Mis turnos</h1>
                            {/* Tabla */}
                        </div>
                    </div>
                    <div className={styles.profileData}>
                        <div className={styles.dataHeader}>
                            <FaUserMd className={styles.imageUser} />
                            <h2>{userInfo?.name}</h2>
                            <p>Usuario</p>
                        </div>
                        <div className={styles.data}>
                            <div className={styles.iconInformation}>
                                <FaRegHeart />
                                <p className={styles.description}>{userInfo?.eps.name}</p>
                            </div>
                            <div className={styles.iconInformation}>
                                <FaIdCard />
                                <p className={styles.description}>{userInfo?.document}</p>
                            </div>
                            <div className={styles.iconInformation}>
                                <FaRegEnvelope />
                                <p className={styles.description}>{userInfo?.email}</p>
                            </div>
                            <div className={styles.iconInformation}>
                                <FaPhoneAlt />
                                <p className={styles.description}>{userInfo?.number}</p>
                            </div>
                            <div className={styles.buttonsContainer}>
                                <div className={styles.iconInformation}>
                                    <Button title='Editar contraseña' className={styles.editButton} onClick={toggleModalPassword}>
                                        <FaLock className={styles.iconEditButton} />
                                    </Button>
                                </div>
                                <div className={styles.iconInformation}>
                                    <Button title='Editar contacto de emergencia' className={styles.editButton} onClick={toggleModalEmergency}>
                                        <FaPhoneAlt className={styles.iconEditButton} />
                                    </Button>
                                </div>
                                <div className={styles.iconInformation}>
                                    <Button title='Editar información' className={styles.editButton} onClick={toggleModal}>
                                        <FaPenToSquare className={styles.iconEditButton} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isVisible={isModalVisible} onClose={toggleModal}>
                <UpdateUserForm />
            </Modal>
            <Modal isVisible={isEmergencyModalVisible} onClose={toggleModalEmergency}>
                <EmergencyContact />
            </Modal>
            <Modal isVisible={isPasswordModalVisible} onClose={toggleModalPassword}>
                <PasswordForm />
            </Modal>
        </>
    );
};

export default Profile;