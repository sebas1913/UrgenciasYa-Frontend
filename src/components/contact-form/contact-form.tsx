import React, { useState } from "react";
import styles from './contact-form.module.scss'
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import Label from "../UI/label/Label";
import Form from "../UI/form/Form";
import TextArea from "../UI/textarea/TextArea";

const ContactForm: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(true); 
    const [selectedName, setSelectedName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
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
                setIsFormVisible(false); // Ocultar el formulario después de enviar
                setErrorMessage(''); // Limpiar el mensaje de error
                console.log('Formulario enviado correctamente.');
            } else {
                throw new Error('Error al enviar el formulario.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('No se pudo enviar el formulario. Intenta de nuevo más tarde.'); 
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
        <div className={styles.formContainer}>
            {isFormVisible ? (
                <>
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
                </>
            ) : (
                errorMessage ? (
                    <p className={styles.errorMessage}>{errorMessage} Error</p>
                ) : (
                    <p className={styles.successMessage}>¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.</p>
                )
            )}
        </div>
    );
};

export default ContactForm;
