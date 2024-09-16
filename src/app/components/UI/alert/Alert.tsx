import React from "react";
import styles from './alert.module.scss';


interface AlertProps{
    message: string;
    type: 'error' | 'success';
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
    return (
      <div className={`${styles.alert} ${type === 'error' ? styles.error : styles.success}`}>
        {message}
      </div>
    );
  };
  
  export default Alert;