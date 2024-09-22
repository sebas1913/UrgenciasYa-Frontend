import React, { ReactNode, useEffect } from 'react';
import styles from './alert.module.scss';

interface AlertProps {
    isVisible: boolean;
    onClose: () => void;
    title: string;
    description: string;
    icono: ReactNode;
}

const Alert: React.FC<AlertProps> = ({ isVisible, onClose, title, description, icono }) => {
    
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose(); 
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);  // Se ejecuta cuando isVisible cambia

    if (!isVisible) return null;

    return (
        <div className={styles.alertContainer}>
            <div className={styles.alertContent}>
                <div className={styles.alertDescription}>
                    <div className={styles.icon}>
                        {icono}
                    </div>
                    <div className={styles.title}>
                        <p><b>{title}</b></p>
                    </div>
                    <div className={styles.text}>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alert;
