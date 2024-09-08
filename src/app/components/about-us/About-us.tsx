import React from "react";
import styles from './about-us.module.scss';
import CardHome from "../card-home/Card-home";

const AboutUs: React.FC = () => {
    return(
        <div className={styles.aboutUsContainer}>
            <h1 className={styles.title}>Sobre nosotros</h1>
            <p className={styles.aboutDescription}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt autem expedita perspiciatis porro quaerat amet iusto animi, deserunt quas excepturi debitis quidem beatae nihil impedit, accusamus adipisci quam magnam fugit error provident illo earum, quod numquam suscipit. Unde, odio ad!. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus accusantium ipsam perferendis, voluptatem neque libero modi odio vitae iste perspiciatis provident deserunt fuga ea quasi. Eos, vero officiis quis deleniti maxime dolores reprehenderit vitae. Magnam iste quibusdam sequi, eaque facilis unde modi quis maxime magni tenetur voluptatum, non deleniti labore.</p>
                <CardHome 
                    title="Nuestra visión"
                    text="Ser la plataforma web líder en el país para el año 2028 avalada por el ministerio de salud, brindando información actualizada y confiable para facilitar el acceso rápido y eficiente a centros de atención de urgencias médicas."
                />
                <CardHome 
                    title="Nuestros valores"
                    text="Nos identificamos con la transparencia, integridad, compromiso, colaboración,confianza y calidad. Estos valores, guían cada aspecto de nuestro trabajo, asegurando que brindemos un servicio confiable y de alta calidad."
                />
                <CardHome 
                    title="Nuestra misión"
                    text="Informar a la población de forma actualizada y confiable, sobre los centros de atención médicos más cercanos y menos congestionados, mejorando su calidad de vida y su seguridad en situaciones de emergencia."
                />
        </div>
    )
}

export default AboutUs;
