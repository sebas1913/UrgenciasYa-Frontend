import Button from '../UI/button/Button';
import styles from './hospital-card.module.scss';
import { FaPhoneAlt } from "react-icons/fa";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { FaRegHospital, FaLocationDot } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { TbMessageCircleFilled } from "react-icons/tb";
import { IHospital } from '@/interfaces/IHospital';
import cookie from 'cookie';
import Alert from '../UI/alert/Alert';
import { useState } from 'react';
import { TiWarningOutline } from "react-icons/ti";
import StarRatings from 'react-star-ratings';

const HospitalCard: React.FC<IHospital> = ({ id, name, phone_number, rating, url_image, howtogetthere, nameTown }) => {

    const [isAlertVisible, setAlertVisible] = useState(false);

    const toggleAlert = () => {
        setAlertVisible(!isAlertVisible);
    };

    const router = useRouter();
    const cookies = cookie.parse(document.cookie || '');
    const token = cookies.auth;

    const onClick = () => {
        if (token) {
            router.push(`/chat/${id}`);
        } else {
            setAlertVisible(true);
        }
    };

    return (
        <div className={styles.filterCardContainer}>

            <div className={styles.filterCardOne}>
                <div>
                    <img className={styles.filterImage} src={url_image} alt={name} />
                </div>
                <div className={styles.containerStars}>
                    <StarRatings
                        rating={rating}
                        starRatedColor="#00BFA5"
                        numberOfStars={5}
                        name='rating'
                        starDimension="1.7rem"
                        starSpacing="0.1rem"
                    />
                </div>
            </div>

            <div className={styles.filterCardTwo}>
                <div className={styles.filterInformation}>
                    <div className={styles.iconInformation}>
                        <Button className={styles.informationButton}><FaRegHospital className={styles.iconDescription} /></Button>
                        <p><b>{name}</b></p>
                    </div>

                    <div className={styles.iconInformation}>
                        <Button className={styles.informationButton}><FaLocationDot className={styles.iconDescription} /></Button><p>{nameTown}</p>
                    </div>
                    
                    <div className={styles.iconInformation}>
                        <Button className={styles.informationButton}><FaPhoneAlt className={styles.iconDescription} /></Button>
                        <p>{phone_number}</p>
                    </div>
                </div>
                <div className={styles.filterButtons}>
                    <Button title='Chat del hospital' className={styles.filterButton}><TbMessageCircleFilled className={styles.buttonIcon} onClick={onClick} /></Button>
                    {isAlertVisible && (
                        <Alert
                            isVisible={isAlertVisible}
                            onClose={toggleAlert}
                            icono={<TiWarningOutline />}
                            title='¡Inicia sesión!'
                            description='Debes iniciar sesión para acceder a esta funcionalidad'
                        >
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HospitalCard;