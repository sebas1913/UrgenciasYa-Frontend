import React from 'react';
import styles from './card.module.scss';

interface CardProps {
  text: string;
  title: string;
}

const CardHome: React.FC<CardProps> = ({ text, title }) => {
  return (
    <div className={styles.cardHome}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardText}>{text}</p>
    </div>
  );
};

export default CardHome;
