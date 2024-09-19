"use client";
import React from "react";
import styles from "./profile-user.module.scss";
import Button from "../../components/UI/button/Button";
import { useState } from "react";
import Modal from "@/components/modal/Modal";
import { FaRegHeart, FaIdCard, FaRegEnvelope, FaPhoneAlt, FaUserMd } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { useAuth } from "@/components/context/AuthContext";
import UserForm from "@/components/user-form/user-form";


const Profile = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const { user } = useAuth(); // Obtén la información del usuario
    const firstName = user?.name.split(' ')[0];

    return (
        <>
            <div className={styles.profileContainer}>
                <div className={styles.profileInformation}>
                    <div className={styles.information}>
                        <div className={styles.welcome}>
                            <h1 className={styles.profileTitle}>¡Hola, {firstName}!</h1>
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
                            <h2>{user?.name}</h2>
                            <p>Usuario</p>
                        </div>
                        <div className={styles.data}>
                            <div className={styles.iconInformation}>
                                <FaRegHeart />
                                <p className={styles.description}>{user?.eps}</p>
                            </div>
                            <div className={styles.iconInformation}>
                                <FaIdCard />
                                <p className={styles.description}>{user?.document}</p>
                            </div>
                            <div className={styles.iconInformation}>
                                <FaRegEnvelope />
                                <p className={styles.description}>{user?.email}</p>
                            </div>
                            <div className={styles.iconInformation}>
                                <FaPhoneAlt />
                                <p className={styles.description}></p>
                            </div>
                            <div className={styles.iconInformation}>
                                <Button className={styles.editButton} onClick={toggleModal}>
                                    <FaPenToSquare className={styles.iconEditButton} /><b>Editar</b>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isVisible={isModalVisible} onClose={toggleModal}>
                <UserForm />
            </Modal>
        </>
    );
};

export default Profile;