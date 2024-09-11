import React, { useState } from "react";
import Button from "../UI/button/Button";
import { FaRegEnvelope } from "react-icons/fa";
import ContactForm from "../form-contact/form-contact";
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
                <ContactForm />
            </Modal>
        </>
    );
};

export default ButtonFloating;
