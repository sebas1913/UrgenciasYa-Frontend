import React from "react";
import styles from './home-information.module.scss'

const HomeInformation : React.FC = () => {
    return(
        <div className={styles.informationContainer}>
            <h1 className={styles.title}>Urgencias Ya</h1>
            <p className={styles.description}>Al indicarnos tu <b>municipio actual</b> y <b>EPS de afiliación</b>, realizaremos una búsqueda oportuna para que conozcas con certeza el centro de atención más cercano para acudir con tu urgencia. Recuerda, eres la prioridad.</p>
        </div>
    );
};

export default HomeInformation;