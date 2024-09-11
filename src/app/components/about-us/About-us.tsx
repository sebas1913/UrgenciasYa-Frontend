import React from "react";
import styles from './about-us.module.scss';
import CardHome from "../card-home/Card-home";

const AboutUs : React.FC = () => {
    return (
        <div className={styles.aboutUsContainer}>

            <h2 className={styles.title}>Sobre nosotros</h2>
            
            <p className={styles.aboutDescription}>En <b>Urgencias Ya</b>, nos dedicamos a facilitar el acceso a la atención médica en momentos críticos. Nuestra plataforma permite a los usuarios encontrar rápidamente <b>hospitales</b> disponibles según su <b>EPS </b> y <b>ubicación</b>, asegurando una respuesta ágil en situaciones de emergencia.</p>

            <CardHome
                title="Misión"
                text="Informar a la población de forma actualizada y confiable, sobre los centros de atención médicos más cercanos y menos congestionados, mejorando su calidad de vida y su seguridad en situaciones de emergencia."
            />
            <CardHome
                title="Visión"
                text="Ser la plataforma web líder en el país para el año 2028 avalada por el ministerio de salud, brindando información actualizada y confiable para facilitar el acceso rápido y eficiente a centros de atención de urgencias médicas."
            />
             <CardHome
                title="Valores"
                text="Nos identificamos con la transparencia, integridad, compromiso, colaboración, confianza y calidad. Estos valores, guían cada aspecto de nuestro trabajo, asegurando que brindemos un servicio confiable y de alta calidad."
            />
        </div>
    );
};

export default AboutUs;
