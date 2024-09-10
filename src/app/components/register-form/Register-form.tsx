import React, { useState } from "react";
import styles from './register-form.module.scss'
import Form from "../form/Form";
import Label from "../UI/label/Label";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";


const RegisterForm : React.FC = () => {

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert('funcionando');
    };

    const [selectedName, setSelectedName] = useState('');
    const [selectedEps, setSelectedEps] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedPassword, setSelectedPassword] = useState('');
   
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedName(event.target.value);
    };

    const handleChangeEps = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedEps(event.target.value);
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedEmail(event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPassword(event.target.value);
    };

    return (
        <div className={styles.formContainer}>
            <Form onSubmit={onSubmit} className={styles.contactForm}>
                <h2>Regístrate</h2>
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
                        htmlFor="eps"
                        label='Ingresa tu EPS afiliada'
                        className={styles.label}
                    ></Label>
                    <Input
                        id='eps'
                        type='text'
                        name='eps'
                        value={selectedEps}
                        onChange={handleChangeEps}
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
                        htmlFor="password"
                        label='Ingresa tu constraseña'
                        className={styles.label}
                    ></Label>
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

export default RegisterForm;