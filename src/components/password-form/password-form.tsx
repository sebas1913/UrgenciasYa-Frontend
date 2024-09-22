import React, { useState, useEffect } from "react";
import styles from './password-form.module.scss'
import Form from "../UI/form/Form";
import Label from "../UI/label/Label";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import { useAuth } from "../context/AuthContext";
import cookie from 'cookie';
import Alert from "../UI/alert/Alert";
import { FaRegCircleCheck } from "react-icons/fa6";
import { TiWarningOutline } from "react-icons/ti";



const PasswordForm: React.FC = () => {
    const { login } = useAuth();
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [isAlertError, setAlertError] = useState(false);
    const [isAlertNull, setAlertNull] = useState(false);

    const handleChangeCurrentPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(event.target.value);
    };

    const handleChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    };

    const handleChangeConfirmNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmNewPassword(event.target.value);
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


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setAlertNull(true)
            return;
        }

        const responseID = localStorage.getItem('userID');
        if (responseID) {
            const userID = JSON.parse(responseID);

            try {
                const response = await fetch(`http://localhost:8080/api/v1/users/${userID.id}/change-password`, {
                    method: 'PUT',
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token} `
                    },
                    body: JSON.stringify({
                        currentPassword: currentPassword,
                        newPassword: newPassword,
                        confirmNewPassword: confirmNewPassword
                    }),
                });

                const data = await response.json();
                console.log(data);
                
                setAlertSuccess(true)

            } catch (error) {
                setAlertError(true)
                console.log(error);
            }
        }
    }

    return (
        <>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>Actualizar contraseña</h2>
                <Form onSubmit={onSubmit} className={styles.updateForm}>
                    <div className={styles.formElement}>
                        <Label
                            htmlFor="password"
                            className={styles.label}
                        >Ingresa tu contraseña actual:</Label>
                        <Input
                            id='password'
                            type='password'
                            name='password'
                            value={currentPassword}
                            onChange={handleChangeCurrentPassword}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formElement}>
                        <Label
                            htmlFor="newPassword"
                            className={styles.label}
                        >Ingresa tu nueva contraseña:</Label>
                        <Input
                            id='newPassword'
                            type='password'
                            name='newPassword'
                            value={newPassword}
                            onChange={handleChangeNewPassword}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formElement}>
                        <Label
                            htmlFor="confirmPassword"
                            className={styles.label}
                        >Confirma tu nueva contraseña:</Label>
                        <Input
                            id='confirmPassword'
                            type='password'
                            name='confirmPassword'
                            value={confirmNewPassword}
                            onChange={handleChangeConfirmNewPassword}
                            className={styles.input}
                        />
                    </div>

                    <div>
                        <Button
                            type='submit'
                            className={styles.updateButton}
                        >Enviar</Button>
                    </div>
                </Form>
            </div >
            <Alert
                isVisible={isAlertSuccess}
                onClose={toggleAlertSuccess}
                icono={< FaRegCircleCheck />}
                title='Actualización exitosa'
                description='Tu contraseña ha sido actualizado exitosamente'
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
                description='Ha ocurrido un error al actualizar tu contraseña. Inténtalo nuevamente'
            />
        </>

    )
}

export default PasswordForm;

