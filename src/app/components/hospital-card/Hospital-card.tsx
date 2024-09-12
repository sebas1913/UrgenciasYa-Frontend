import Button from '../UI/button/Button';
import styles from './hospital-card.module.scss';
import { FaRegHeart, FaMapPin, FaPhoneAlt, FaCar } from "react-icons/fa";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { LuMessageCircle } from "react-icons/lu";



interface Hospital {
    name: string;           // Nombre del hospital.
    phone_number: string;   // Número de teléfono del hospital.
    howtogetthere?: string;  // Indicaciones de cómo llegar al hospital.
    rating: string | number;         // Puntuación del hospital.
    url_image: string;      // URL de la imagen del hospital.
};

const HospitalCard: React.FC<Hospital> = ({ name, phone_number, rating, url_image }) => {
    return (
        <div className={styles.filterCardContainer}>

            <div className={styles.filterCardOne}>
                <div className={styles.filterImage}>
                    <img src={url_image} alt={name} />
                </div>
                <div>
                    <p>{rating}</p>
                </div>
            </div>

            <div className={styles.filterCardTwo}>
                <div className={styles.filterInformation}>
                    <div className={styles.iconInformation}>
                        <Button className={styles.informationButton}><FaRegHeart className={styles.iconDescription}/></Button>
                        <p>{name}</p>
                    </div>

                    <div className={styles.iconInformation}>
                        <Button className={styles.informationButton}><FaMapPin className={styles.iconDescription}/></Button>
                        <p>Ubicación</p>
                    </div>

                    <div className={styles.iconInformation}>
                        <Button className={styles.informationButton}><BiSolidBarChartAlt2 className={styles.iconDescription}/></Button>
                        <p>Concurrencia</p>
                    </div>

                    <div className={styles.iconInformation}>
                        <Button className={styles.informationButton}><FaPhoneAlt className={styles.iconDescription}/></Button>
                        <p>{phone_number}</p>
                    </div>
                </div>
                <div className={styles.filterButtons}>
                    <Button className={styles.filterButton}><LuMessageCircle className={styles.buttonIcon}/>
                    </Button> 
                    <Button className={styles.filterButton}><FaCar className={styles.buttonIcon}/></Button> 
                </div>
            </div>
        </div>
    );
};

export default HospitalCard;