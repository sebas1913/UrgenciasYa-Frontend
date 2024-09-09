import React from "react";
import styles from './home-information.module.scss'

const HomeInformation : React.FC = () => {
    return(
        <div className={styles.aboutUsContainer}>
            <h1 className={styles.title}>¡Tu Urgencia Ya!</h1>
            <p className={styles.aboutDescription}>Al indicarnos tu <b>municipio actual</b> y <b>EPS de afiliación</b>, realizaremos una búsqueda oportuna para que conozcas con certeza el centro de atención más cercano para acudir con tu urgencia. Recuerda, eres la prioridad.</p>
        </div>
    );
};

export default HomeInformation;