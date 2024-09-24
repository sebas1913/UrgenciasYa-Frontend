import React, { useState } from "react";
import styles from './work-form.module.scss'
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

const WorkWithUsForm: React.FC<ContactFormProps> = ({ onClose }) => {
    const [selectedName, setSelectedName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [isAlertError, setAlertError] = useState(false);
    const [isAlertNull, setAlertNull] = useState(false);
    const [text, setText] = useState<string>('');

    const toggleAlertSuccess = () => {
        setAlertSuccess(!isAlertSuccess);
    };

    const toggleAlertNull = () => {
        setAlertNull(!isAlertNull);
    };

    const toggleAlertError = () => {
        setAlertError(!isAlertError);
    };

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedName(event.target.value);
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedEmail(event.target.value);
    };

    const handleChangeSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSubject(event.target.value);
    };

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedName || !selectedEmail || !selectedSubject || !text) {
            setAlertNull(true);
            return;
        };

        try {
            const response = await fetch('/api/workEmails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: selectedName, email: selectedEmail, subject: selectedSubject, message: text }),
            });

            if (response.ok) {
                setSelectedName('');
                setSelectedEmail('');
                setSelectedSubject('');
                setAlertSuccess(true);

                setTimeout(() => {
                    onClose();
                }, 2500);

            } else {
                throw new Error('Error al enviar el formulario.');
            }
        }
        catch (error) {
            setAlertError(true);
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className={styles.formContainer}>
                <Form onSubmit={onSubmit} className={styles.contactForm}>
                    <h2 className={styles.title}>Trabaja con nosotros</h2>
                    <div className={styles.formElement}>
                        <Label
                            htmlFor="name"
                            className={styles.label}
                        >Ingresa nombre completo o nombre de la entidad</Label>
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
                            htmlFor="subject"
                            className={styles.label}
                        >Ingresa el asunto</Label>
                        <Input
                            id='subject'
                            type='text'
                            name='subject'
                            value={selectedSubject}
                            onChange={handleChangeSubject}
                            className={styles.input}
                        ></Input>
                    </div>

                    <div className={styles.formElement}>
                        <Label
                            htmlFor="comment"
                            className={styles.label}
                        >Descripción</Label>
                        <TextArea
                            id='comment'
                            value={text}
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
                            className={styles.contactButton}>Enviar</Button>
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

export default WorkWithUsForm;