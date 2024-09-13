import React, { useState } from "react";
import styles from './register-form.module.scss'
import Form from "../form/Form";
import Label from "../UI/label/Label";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import { Albert_Sans } from "next/font/google";


const RegisterForm : React.FC = () => {

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedName || !selectedEps || !selectedEmail || !selectedPassword) {
            alert('Por favor, completa todos los campos.');
            return;
        };
        
        try {
          const response: Response = await fetch('http://localhost:8080/api/v1/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: selectedName,      // Asegúrate de que selectedName esté definido
              eps: selectedEps,        // Asegúrate de que selectedEps esté definido
              email: selectedEmail,    // Asegúrate de que selectedEmail esté definido
              password: selectedPassword // Asegúrate de que selectedPassword esté definido
            }),
          });
      
          // Verificar si la respuesta fue exitosa
          if (!response.ok) {
            throw new Error(`Error en el registro: ${response.statusText}`);
          }
      
          const data = await response.json(); // Parsear la respuesta si es JSON
          console.log("Registro exitoso:", data); // Manejar la respuesta
        } catch (error) {
          console.error("Error en la solicitud:", error); // Manejar cualquier error
        }
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

            <img className={styles.image} src="./images/LogoDos.png" ></img>

            <h2 className={styles.title}>Registrarse</h2>

            <Form onSubmit={onSubmit} className={styles.contactForm}>
                
                <div className={styles.formElement}>
                    <Label
                        htmlFor="name"
                        className={styles.label}
                    >Ingresa tu nombre completo:</Label>
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
                        className={styles.label}
                    >Ingresa tu <b>EPS </b>afiliada:</Label>
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

export default RegisterForm;