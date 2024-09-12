import React, { useState } from "react";
import styles from './form-contact.module.scss'
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import Label from "../UI/label/Label";
import Form from "../form/Form";
import TextArea from "../UI/textarea/TextArea";

const ContactForm: React.FC = () => {

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

              console.log('Formulario enviado correctamente.');
            } 
            else {
              throw new Error('Error al enviar el formulario.');
            }
          } 
          catch (error) {
            console.error('Error:', error);
          }
    };

    const [selectedName, setSelectedName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<string>('');

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
                    ></Input>
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
                    ></Input>
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
    );
};

export default ContactForm;