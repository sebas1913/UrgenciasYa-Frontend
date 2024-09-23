import React, { useState, useEffect } from "react";
import styles from './emergency-form.module.scss';
import Form from "../UI/form/Form";
import Label from "../UI/label/Label";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import cookie from 'cookie';
import { IUserInformation } from "@/interfaces/IUser";

const EmergencyContact: React.FC = () => {
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [userInfo, setUserInfo] = useState<IUserInformation | null>(null); // Estado para almacenar la información del usuario.

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContactName(event.target.value);
    };

    const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContactPhone(event.target.value);
    };

    const cookies = cookie.parse(document.cookie || '');
    const token = cookies.auth;

    useEffect(() => {
        const responseID = localStorage.getItem('userID');

        const fetchUser = async () => {
            if (responseID) {
                const userID = JSON.parse(responseID);

                try {
                    const response: Response = await fetch(`http://localhost:8080/api/v1/users/${userID.id}`, {
                        method: 'GET',
                        headers: {
                            'accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const data: IUserInformation = await response.json();
                    setUserInfo(data);
                    if (data.contact) {
                        setContactName(data.contact.name);
                        setContactPhone(data.contact.phone);
                    }
                } catch (error) {
                    console.error(`No se pudo realizar la petición: ${error}`);
                }
            }
        };
        fetchUser();
    }, []);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const responseID = localStorage.getItem('userID');

        if (responseID) {
            const userID = JSON.parse(responseID);
            const body = JSON.stringify({ 
                    name: contactName, 
                    phone: contactPhone 
                });
            
            console.log(body);

            try {
                const endpoint = userInfo?.contact ? `http://localhost:8080/api/v1/contacts/${userID.id}` : `http://localhost:8080/api/v1/contacts/create/${userID.id}`;
                const method = userInfo?.contact ? 'PUT' : 'POST'; // Cambiar a 'POST' si es creación

                const response = await fetch(endpoint, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: body,
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('éxito');
                } else {
                    console.log('érror');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Contacto de emergencia</h2>
            <Form onSubmit={onSubmit} className={styles.emergencyForm}>
                <div className={styles.formElement}>
                    <Label htmlFor="name" className={styles.label}>
                        Ingresa el nombre de tu contacto:
                    </Label>
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
                    <Label htmlFor="number" className={styles.label}>
                        Ingresa el número de tu contacto:
                    </Label>
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
                    <Button type='submit' className={styles.emergencyButton}>
                        Enviar
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default EmergencyContact; 