import Button from '../UI/button/Button';
import styles from './hospital-card.module.scss';
import { FaRegHeart, FaMapPin, FaPhoneAlt, FaCar } from "react-icons/fa";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { FaCalendarCheck } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { TbMessageCircleFilled } from "react-icons/tb";

interface Hospital {
    name: string;           
    phone_number: string;   
    howtogetthere?: string;  
    rating: string | number;        
    url_image: string;    
};

const HospitalCard: React.FC<Hospital> = ({ name, phone_number, rating, url_image }) => {

    const router = useRouter();

    const onClick = () => {
        router.push(`/chat`);
      };

    return (
        <div className={styles.filterCardContainer}>

            <div className={styles.filterCardOne}>
                <div>
                    <img className={styles.filterImage} src={url_image} alt={name} />
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
                    <Button className={styles.filterButton}><FaCalendarCheck className={styles.buttonIcon}/></Button> 
                    <Button className={styles.filterButton}><TbMessageCircleFilled  className={styles.buttonIcon} onClick={onClick}/></Button> 
                    <Button className={styles.filterButton}><FaCar className={styles.buttonIcon}/></Button> 
                </div>
            </div>
        </div>
    );
};

export default HospitalCard;