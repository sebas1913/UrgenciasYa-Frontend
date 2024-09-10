import React, { useState } from "react";
import styles from './button-floating.module.scss';
import Button from "../UI/button/Button";
import { FaRegEnvelope } from "react-icons/fa";
import ContactForm from "../form-contact/form-contact";

const ButtonFloating: React.FC = () => {
    const [isFormVisible, setFormVisible] = useState(false);

    const toggleForm = () => {
        setFormVisible(!isFormVisible);
    };

    return (
        <>
            <Button className={styles.floatingButton} onClick={toggleForm}>
                <FaRegEnvelope />
            </Button>

            {isFormVisible && (
                <div className={styles.modalContainer}>
                    <ContactForm></ContactForm>
                </div>
            )}
        </>
    );
};

export default ButtonFloating;