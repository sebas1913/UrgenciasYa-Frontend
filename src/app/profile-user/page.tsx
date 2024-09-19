"use client";
import React from "react";
import styles from "./profile-user.module.scss";
import Button from "../../components/UI/button/Button";
import { FaRegHeart, FaIdCard, FaRegEnvelope, FaPhoneAlt, FaUserMd } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";


const Profile = () => {
    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileInformation}>
                <div className={styles.information}>
                    <div className={styles.welcome}>
                        <h1 className={styles.profileTitle}>¡Hola, Diego!</h1>
                        <div className={styles.welcomeInformation}>
                            <p>Al auntenticarte tienes nuevas opciones de accesbilidad. Ahora, al darle click al botón, puedes realizar tu <b>búsqueda</b> de manera autmática.</p>
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
                    <FaUserMd className={styles.imageUser}/>

                        <h2>Diego Guayabas</h2>
                        <p>Usuario</p>
                    </div>
                    <div className={styles.data}>
                        <div className={styles.iconInformation}>
                            <FaRegHeart />
                            <p className={styles.description}>Sura</p>
                        </div>
                        <div className={styles.iconInformation}>
                            <FaIdCard />
                            <p className={styles.description}>100992012</p>
                        </div>
                        <div className={styles.iconInformation}>
                            <FaRegEnvelope />
                            <p className={styles.description}>diego@gmail.com</p>
                        </div>
                        <div className={styles.iconInformation}>
                            <FaPhoneAlt />
                            <p className={styles.description}>3218898812</p>
                        </div>
                        <div className={styles.iconInformation}>
                            <FaPenToSquare />
                            <p className={styles.description}>Editar</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;