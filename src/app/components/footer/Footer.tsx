"use client";
import React, { useState } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import styles from './footer.module.scss';
import Button from "../UI/button/Button";
import WorkWithUsForm from "../work-with-us/form-work";
import Modal from "../modal/Modal";

const Footer: React.FC = () => {
    const [isFormVisible, setFormVisible] = useState(false);

    const toggleForm = () => {
        setFormVisible(!isFormVisible);
    };

    return (
        <footer className={styles.footerContainer}>
            <div className={styles.leftSection}>
                <img
                    className={styles.logo}
                    src="./images/white_logo.png"
                    alt="Logo"
                />
            </div>
            <div className={styles.centerSection}>
                <Button type="button" className={styles.buttonWork} onClick={toggleForm}>
                    Trabaja con nosotros
                </Button>
                <p className={styles.copyright}>
                    ©2024 Urgencias YA
                </p>
            </div>

            <div className={styles.rightSection}>
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

            <Modal isVisible={isFormVisible} onClose={toggleForm}>
                <WorkWithUsForm />
            </Modal>
        </footer>
    );
};

export default Footer;
