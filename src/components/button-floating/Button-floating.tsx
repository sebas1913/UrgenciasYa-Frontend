import React, { useState } from "react";
import Button from "../UI/button/Button";
import { FaRegEnvelope } from "react-icons/fa";
import ContactForm from "../contact-form/contact-form";
import Modal from "../modal/Modal";
import styles from './button-floating.module.scss';

const ButtonFloating: React.FC = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <>
            <Button className={styles.floatingButton} onClick={toggleModal}>
                <FaRegEnvelope />
            </Button>

            <Modal isVisible={isModalVisible} onClose={toggleModal}>
                <ContactForm onClose={toggleModal}/>
            </Modal>
        </>
    );
};

export default ButtonFloating;
