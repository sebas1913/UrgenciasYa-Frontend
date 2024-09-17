"use client";
import React from "react";
import styles from "./profile-user.module.scss";
import Button from "../components/UI/button/Button";

const Profile = () =>{
    return(
        <div className={styles.informationContainer}>
            <div className={styles.containerLeft}>
                <h1 className={styles.title}>Bienvenido</h1>
                <h2 className={styles.nameUser}>Sebastián</h2>
                <p className={styles.description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, amet laudantium? Delectus qui autem tempore similique deserunt ullam magni totam dicta voluptas repudiandae. Excepturi quidem, ipsam dicta fuga provident nobis voluptas exercitationem..</p>
                <Button type="button" className={styles.button}>Realizar búsqueda</Button>
            </div>
            <div className={styles.containerRight}>
                
            </div>

        </div>
    )
}

export default Profile;