// src/components/LoginForm.tsx
import React, { useState } from "react";
import styles from './login-form.module.scss';
import Form from "../UI/form/Form";
import Label from "../UI/label/Label";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import { useRouter } from "next/navigation";
import { useAuth } from '../context/AuthContext'; // Importa el contexto

const LoginForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const router = useRouter();
    const { login } = useAuth(); // Usa el contexto

    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedPassword, setSelectedPassword] = useState('');

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedEmail || !selectedPassword) {
            alert('Por favor, completa todos los campos.');
            return;
        }

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
            const token = data.token;

            if (token) {
                login(token); // Usa el contexto para iniciar sesión
                router.push('/profile-user');
                onSuccess();
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedEmail(event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPassword(event.target.value);
    };

    return (
        <div className={styles.formContainer}>
            <img className={styles.image} src="./images/turquoise_logo.png" />
            <h2 className={styles.title}>Iniciar sesión</h2>
            <Form onSubmit={onSubmit} className={styles.contactForm}>
                <div className={styles.formElement}>
                    <Label htmlFor="email" className={styles.label}>
                        Ingresa tu correo electrónico:
                    </Label>
                    <Input
                        id='email'
                        type='text'
                        name='email'
                        value={selectedEmail}
                        onChange={handleChangeEmail}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formElement}>
                    <Label htmlFor="password" className={styles.label}>
                        Ingresa tu contraseña:
                    </Label>
                    <Input
                        id='password'
                        type='password'
                        name='password'
                        value={selectedPassword}
                        onChange={handleChangePassword}
                        className={styles.input}
                    />
                </div>
                <div>
                    <Button type='submit' className={styles.contactButton}>
                        Enviar
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;
