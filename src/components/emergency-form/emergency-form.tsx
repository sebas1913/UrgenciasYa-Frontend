import React, { useState, useEffect } from "react";
import styles from './emergency-form.module.scss'
import Form from "../UI/form/Form";
import Label from "../UI/label/Label";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import cookie from 'cookie';

const EmergencyContact: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContactName(event.target.value);
    };

    const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContactPhone(event.target.value);
    };

    const cookies = cookie.parse(document.cookie || '');
    const token = cookies.auth;


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const responseID = localStorage.getItem('userID');

        if (responseID) {
            const userID = JSON.parse(responseID);

            try {
                const response = await fetch(`http://localhost:8080/api/v1/contacts/create/${userID.id}`, {
                    method: 'POST',
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token} `
                    },
                    body: JSON.stringify({
                        name: contactName,
                        phone: contactPhone
                    }),
                });

                const data = await response.json();
                console.log(data);


            } catch (error) {
                console.log(error);
            }
        }
    }



    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Contacto de emergencia</h2>
            <Form onSubmit={onSubmit} className={styles.emergencyForm}>
                <div className={styles.formElement}>
                    <Label
                        htmlFor="name"
                        className={styles.label}
                    >Ingresa el nombre de tu contacto:</Label>
                    <Input
                        id='name'
                        type='text'
                        name='name'
                        value={contactName}
                        onChange={handleChangeName}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formElement}>
                    <Label
                        htmlFor="number"
                        className={styles.label}
                    >Ingresa el número de tu contacto:</Label>
                    <Input
                        id='number'
                        type='number'
                        name='number'
                        value={contactPhone}
                        onChange={handleChangeNumber}
                        className={styles.input}
                    />
                </div>
                <div>
                    <Button
                        type='submit'
                        className={styles.emergencyButton}
                    >Enviar</Button>
                </div>
            </Form>

        </div>
    )
}

export default EmergencyContact;
