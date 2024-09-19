import Button from '../UI/button/Button';
import styles from './hospital-card.module.scss';
import { FaMapPin, FaPhoneAlt } from "react-icons/fa";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { FaCalendarCheck, FaRegHospital } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { TbMessageCircleFilled } from "react-icons/tb";
import { IHospital } from '@/interfaces/IHospital';

const HospitalCard: React.FC<IHospital> = ({ name, phone_number, rating, url_image, howtogetthere, nameTown }) => {

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
                        <Button className={styles.informationButton}><FaRegHospital className={styles.iconDescription}/></Button>
                        <p>{name}</p>
                    </div>

                    <div className={styles.iconInformation}>
                        <a href={howtogetthere} target="_blank" rel="noopener noreferrer"><Button className={styles.informationButton}><FaMapPin className={styles.iconDescription}/></Button></a><p>{nameTown}</p>
                    </div>

                    <div className={styles.iconInformation}>
                        <Button className={styles.informationButton}><BiSolidBarChartAlt2 className={styles.iconDescription}/></Button>
                        <p>Concurrencia</p>
                    </div>

                    <div className={styles.iconInformation}>
                        <Button className={styles.informationButton}><FaPhoneAlt className={styles.iconDescription}/></Button>
                        <p>{phone_number}</p>
                    </div>

                    <div className={styles.iconInformation}>
                        <Button className={styles.informationButton}><FaCalendarCheck className={styles.iconDescription}/></Button>
                        <p>Agendar un turno</p>
                    </div>
                </div>
                <div className={styles.filterButtons}>
                    <Button className={styles.filterButton}><TbMessageCircleFilled  className={styles.buttonIcon} onClick={onClick}/></Button> 
                </div>
            </div>
        </div>
    );
};

export default HospitalCard;