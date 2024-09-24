import React, { useState } from "react";
import styles from './contact-form.module.scss'
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import Label from "../UI/label/Label";
import Form from "../UI/form/Form";
import TextArea from "../UI/textarea/TextArea";
import Alert from "../UI/alert/Alert";
import { FaRegCircleCheck } from "react-icons/fa6";
import { TiWarningOutline } from "react-icons/ti";

interface ContactFormProps {
    onClose: () => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [selectedName, setSelectedName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<string>('');
    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [isAlertError, setAlertError] = useState(false);
    const [isAlertNull, setAlertNull] = useState(false);


    const toggleAlertSuccess = () => {
        setAlertSuccess(!isAlertSuccess);
    };

    const toggleAlertNull = () => {
        setAlertNull(!isAlertNull);
    };

    const toggleAlertError = () => {
        setAlertError(!isAlertError);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedName || !selectedMessage || !selectedEmail) {
            setAlertNull(true);
            return;
        }

        try {
            const response = await fetch('/api/contactEmails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: selectedName, email: selectedEmail, message: selectedMessage }),
            });

            if (response.ok) {
                setSelectedName('');
                setSelectedEmail('');
                setSelectedMessage('');
                setAlertSuccess(true);

                setTimeout(() => {
                    setIsFormVisible(false);
                    onClose();
                }, 2500);

            } else {
                throw new Error('Error al enviar el formulario.');
            }
        } catch (error) {
            setAlertError(true);
            console.error('Error:', error);
        }
    };

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedName(event.target.value);
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedEmail(event.target.value);
    };

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSelectedMessage(event.target.value);
    };

    return (
        <>
            <div className={styles.formContainer}>

                <h2 className={styles.title}>Contáctanos</h2>
                <Form onSubmit={onSubmit} className={styles.contactForm}>
                    <div className={styles.formElement}>
                        <Label
                            htmlFor="name"
                            className={styles.label}
                        >Ingresa tu nombre completo</Label>
                        <Input
                            id='name'
                            type='text'
                            name='name'
                            value={selectedName}
                            onChange={handleChangeName}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formElement}>
                        <Label
                            htmlFor="email"
                            className={styles.label}
                        >Ingresa tu correo electrónico</Label>
                        <Input
                            id='email'
                            type='email'
                            name='email'
                            value={selectedEmail}
                            onChange={handleChangeEmail}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formElement}>
                        <Label
                            htmlFor="message"
                            className={styles.label}
                        >Descripción</Label>
                        <TextArea
                            id='message'
                            value={selectedMessage}
                            onChange={handleTextareaChange}
                            placeholder="Mensaje"
                            rows={5}
                            cols={50}
                            maxLength={250}
                            className={styles.textarea}
                        />
                    </div>

                    <div>
                        <Button
                            type='submit'
                            className={styles.contactButton}
                        >Enviar</Button>
                    </div>
                </Form>
            </div>
            <Alert
                isVisible={isAlertSuccess}
                onClose={toggleAlertSuccess}
                icono={< FaRegCircleCheck />}
                title='Formulario enviado'
                description='¡Pronto nos pondremos en contacto contigo!'
            />

            <Alert
                isVisible={isAlertNull}
                onClose={toggleAlertNull}
                icono={< TiWarningOutline />}
                title='¡Oops, ha ocurrido un error!'
                description='Por favor, completa todos los campos'
            />

            <Alert
                isVisible={isAlertError}
                onClose={toggleAlertError}
                icono={< TiWarningOutline />}
                title='¡Oops, ha ocurrido un error!'
                description='Ha ocurrido un error al enviar tus datos. Inténtalo nuevamente'
            />
        </>
    );
};

export default ContactForm;
