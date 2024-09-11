import React from "react";
import styles from './home-information.module.scss';
import SearchForm from "../search-form/Search-form";

const HomeInformation: React.FC = () => {
    return (
        <div className={styles.informationContainer}>
            <div className={styles.containerLeft}>
                <h1 className={styles.title}>Urgencias Ya</h1>
                <p className={styles.description}>Al indicarnos tu <b>municipio actual</b> y <b>EPS</b>, realizaremos una búsqueda oportuna para que conozcas con certeza el centro de atención más cercano para acudir con tu urgencia. Recuerda, eres la prioridad.</p>
                <p className={styles.admiration}>¡Tu <b>urgencia</b> es la prioridad!</p>
            </div>
            <div className={styles.containerRight}>
                <SearchForm></SearchForm>
            </div>

        </div>

    );
};

export default HomeInformation;