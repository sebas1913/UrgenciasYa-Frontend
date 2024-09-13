import React, { useState } from "react";
import styles from './login-form.module.scss';
import Form from "../form/Form";
import Label from "../UI/label/Label";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";


const LoginForm : React.FC = () => {

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
       
        if (!selectedEmail || !selectedPassword) {
            alert('Por favor, completa todos los campos.');
            return;
        };
      };      

    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedPassword, setSelectedPassword] = useState('');
   
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedEmail(event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPassword(event.target.value);
    };

    return (
        <div className={styles.formContainer}>

            <img className={styles.image} src="./images/turquoise_logo.png" ></img>

            <h2 className={styles.title}>Iniciar sesión</h2>

            <Form onSubmit={onSubmit} className={styles.contactForm}>

                <div className={styles.formElement}>
                    <Label
                        htmlFor="email"
                        className={styles.label}
                    >Ingresa tu correo electrónico:</Label>
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
                        htmlFor="password"
                        className={styles.label}
                    >Ingresa tu contraseña:</Label>
                    <Input
                        id='password'
                        type='password'
                        name='password'
                        value={selectedPassword}
                        onChange={handleChangePassword}
                        className={styles.input}
                    ></Input>
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

export default LoginForm;