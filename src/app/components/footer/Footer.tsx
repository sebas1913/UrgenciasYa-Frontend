"use client";
import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import styles from './footer.module.scss'; 

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
        <div className={styles.leftSection}>
            <img 
                className={styles.logo}
                src="/images/UrgenciasYa.png"
                alt="Logo"
            />
        </div>
        
        <p className={styles.copyright}>
            ©2024 Urgencias YA
        </p>

        <div className={styles.socialMedia}>
            <a 
                className={styles.socialLink} 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <AiFillInstagram />
            </a>
            <a 
                className={styles.socialLink} 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <FaFacebookF />
            </a>
            <a 
                className={styles.socialLink} 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <FaLinkedinIn />
            </a>
        </div>
    </footer>
  );
};

export default Footer;
