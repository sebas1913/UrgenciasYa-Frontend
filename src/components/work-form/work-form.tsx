import React, { useState } from "react";
import styles from './work-form.module.scss'
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import Label from "../UI/label/Label";
import Form from "../UI/form/Form";
import TextArea from "../UI/textarea/TextArea";

const WorkWithUsForm: React.FC = () => {

    const onSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
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
              setText('');

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
    const [selectedSubject, setSelectedSubject] = useState('');
    const [text, setText] = useState<string>('');


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


    return (
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
                        type='subject'
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
                        className={styles.contactButton}
                    >Enviar</Button>
                </div>
            </Form>
        </div>
    );
};

export default WorkWithUsForm;