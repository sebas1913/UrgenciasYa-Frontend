import React, { useState } from "react";
import styles from './form-contact.module.scss'
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import Label from "../UI/label/Label";
import Form from "../form/Form";
import TextArea from "../UI/textarea/TextArea";

const ContactForm: React.FC = () => {

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert('funcionando');
    };

    const [selectedName, setSelectedName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedName(event.target.value);
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedEmail(event.target.value);
    };

    const [text, setText] = useState<string>('');

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    return (
        <div className={styles.formContainer}>

            <h2 className={styles.title}>Contáctanos</h2>

            <Form onSubmit={onSubmit} className={styles.contactForm}>
                
                <div className={styles.formElement}>
                    <Label
                        htmlFor="name"
                        label='Ingresa tu nombre completo'
                        className={styles.label}
                    ></Label>
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
                        label='Ingresa tu correo electrónico'
                        className={styles.label}
                    ></Label>
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
                        htmlFor="comentario"
                        label='Descripción'
                        className={styles.label}
                    ></Label>
                    <TextArea
                        id='comentario'
                        value={text}
                        onChange={handleTextareaChange}
                        placeholder="Deja tu comentario aquí"
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