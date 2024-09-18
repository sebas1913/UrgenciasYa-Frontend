import React, { useState } from "react";
import styles from './login-form.module.scss';
import Form from "../form/Form";
import Label from "../UI/label/Label";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import { useRouter } from "next/navigation";


const LoginForm: React.FC = () => {
    
    const router = useRouter();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedEmail || !selectedPassword) {
            alert('Por favor, completa todos los campos.');
            return;
        };

        try {
            const response: Response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: selectedEmail,
                    password: selectedPassword
                }),
            });
            if (!response.ok) {
                throw new Error(`Error en el log in: ${response.statusText}`);
            }
            const data = await response.json();
            console.log("Log in exitoso");

            const token = data.token;
            sessionStorage.setItem('auth', token);

            if(token) {
                router.push('/profile-user');
            }
            
        } catch (error) {
            console.error("Error en la solicitud:", error); 
        }
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
                        type='text'
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