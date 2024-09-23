import React, { useState, useEffect } from "react";
import styles from './emergency-form.module.scss';
import Form from "../UI/form/Form";
import Label from "../UI/label/Label";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import cookie from 'cookie';
import { IUserInformation } from "@/interfaces/IUser";
import Alert from "../UI/alert/Alert";
import { FaRegCircleCheck } from "react-icons/fa6";
import { TiWarningOutline } from "react-icons/ti";

interface EmergencyFormProps {
    onClose: () => void;
}

const EmergencyContact: React.FC<EmergencyFormProps> = ({ onClose }) => {
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [userInfo, setUserInfo] = useState<IUserInformation | null>(null); // Estado para almacenar la información del usuario.
    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [isAlertError, setAlertError] = useState(false);
    const [isAlertNull, setAlertNull] = useState(false);


    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContactName(event.target.value);
    };

    const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContactPhone(event.target.value);
    };

    const toggleAlertSuccess = () => {
        setAlertSuccess(!isAlertSuccess);
    };

    const toggleAlertError = () => {
        setAlertError(!isAlertError);
    };

    const toggleAlertNull = () => {
        setAlertNull(!isAlertNull);
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

        if (!contactName || !contactPhone) {
            setAlertNull(true)
            return;
        }

        const responseID = localStorage.getItem('userID');

        if (responseID) {
            const userID = JSON.parse(responseID);

            const endpoint = userInfo?.contact
                ? `http://localhost:8080/api/v1/contacts/${userInfo.contact.id
                }?name=${encodeURIComponent(contactName)}&phone=${encodeURIComponent(contactPhone)}`
                : `http://localhost:8080/api/v1/contacts/create/${userID.id}?name=${encodeURIComponent(contactName)}&phone=${encodeURIComponent(contactPhone)}`;

            try {
                const response = await fetch(endpoint, {
                    method: userInfo?.contact ? 'PUT' : 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('éxito', data);
                    setAlertSuccess(true);
                    setTimeout(() => {
                        onClose();
                    }, 2500);

                } else {
                    console.error('Error:', data);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
    };

    return (
        <>
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

            <Alert
                isVisible={isAlertSuccess}
                onClose={toggleAlertSuccess}
                icono={< FaRegCircleCheck />}
                title='Actualización exitosa'
                description='Tu contacto de emergencia ha sido actualizado exitosamente'
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
                description='Ha ocurrido un error al actualizar tus datos de contacto. Inténtalo nuevamente'
            />
        </>
    );
};

export default EmergencyContact; 