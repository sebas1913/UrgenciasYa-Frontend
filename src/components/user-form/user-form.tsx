import React, { useState, useEffect } from "react";
import Button from "../UI/button/Button";
import Input from "../UI/input/Input";
import styles from "./user-form.module.scss";
import Form from "../UI/form/Form";
import Label from "../UI/label/Label";
import Select from "../UI/select/Select";
import { useAuth } from "../context/AuthContext";
import cookie from 'cookie';
import Alert from "../UI/alert/Alert";
import { FaRegCircleCheck } from "react-icons/fa6";
import { TiWarningOutline } from "react-icons/ti";


const UpdateUserForm: React.FC = () => {
    const { login } = useAuth();
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [selectedName, setSelectedName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedEps, setSelectedEps] = useState('');
    const [eps, setEps] = useState<{ label: string, value: string }[]>([]);
    const [selectedDocument, setSelectedDocument] = useState('');
    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [isAlertError, setAlertError] = useState(false);
    const [isAlertNull, setAlertNull] = useState(false);


    const cookies = cookie.parse(document.cookie || '');
    const token = cookies.auth;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const responseID = localStorage.getItem('userID');

                if (responseID) {
                    const userID = JSON.parse(responseID);
                    const userResponse = await fetch(`https://urgenciasya-backend.onrender.com/api/v1/users/${userID.id}`, {
                        method: 'GET',
                        headers: {
                            'accept': 'application/json',
                            'Authorization': `Bearer ${token}` // Añade el token aquí
                        }
                    });

                    if (userResponse.ok) {
                        const userData = await userResponse.json();
                        setSelectedName(userData.name);
                        setSelectedEmail(userData.email);
                        setSelectedEps(userData.eps);
                        setSelectedDocument(userData.document);
                    } else {
                        throw new Error(`Error al obtener datos del usuario: ${userResponse.statusText}`);
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
        fetchEps();
    }, []);

    const fetchEps = async () => {
        try {
            const response: Response = await fetch("https://urgenciasya-backend.onrender.com/api/v1/eps/getAll");
            const data = await response.json();
            const epsOptions = data.map((element: any) => ({
                label: element.name,
                value: element.name
            }));

            const defaultOption = { label: 'Ingresa una opción', value: '' };
            const optionsWithDefault = [defaultOption, ...epsOptions];

            setEps(optionsWithDefault);
        } catch (error) {
            console.error("Error fetching EPS:", error);
        }
    };

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedName(event.target.value);
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedEmail(event.target.value);
    };

    const handleChangeEps = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEps(event.target.value);
    };

    const handleChangeDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDocument(event.target.value);
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

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedName || !selectedEps || !selectedEmail || !selectedDocument) {
            setAlertNull(true)
            return;
        };

        const cookies = cookie.parse(document.cookie || '');
        const token = cookies.auth;

        const responseID = localStorage.getItem('userID');
        if (responseID) {
            const userID = JSON.parse(responseID);

            try {
                const response = await fetch(`https://urgenciasya-backend.onrender.com/api/v1/users/update/${userID.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: selectedName,
                        document: selectedDocument,
                        eps: selectedEps,
                        email: selectedEmail,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setIsFormVisible(false);
                    const newToken = data.token;

                    if (newToken) {
                        login(newToken, { id: userID.id });
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    }
                } else {
                    throw new Error(`Error en la actualización: ${data.message || response.statusText}`);
                }
                setAlertSuccess(true);

            } catch (error) {
                setAlertError(true);
            }
        }
    };

    return (
        <>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>Actualizar información</h2>
                <Form onSubmit={onSubmit} className={styles.updateForm}>
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
                        />
                    </div>

                    <div className={styles.formElement}>
                        <Label
                            htmlFor="document"
                            className={styles.label}
                        >Ingresa tu documento:</Label>
                        <Input
                            id='document'
                            type='number'
                            name='document'
                            value={selectedDocument}
                            onChange={handleChangeDocument}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formElement}>
                        <Label
                            htmlFor="eps"
                            className={styles.label}
                        >Ingresa tu EPS afiliada:</Label>
                        <Select
                            id="eps"
                            options={eps}
                            value={selectedEps}
                            onChange={handleChangeEps}
                            className={styles.selectEPS}
                            disabled={false}
                        />
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
                        />
                    </div>

                    <div>
                        <Button
                            type='submit'
                            className={styles.updateButton}>Enviar</Button>
                    </div>
                </Form>
            </div >

            <Alert
                isVisible={isAlertSuccess}
                onClose={toggleAlertSuccess}
                icono={< FaRegCircleCheck />}
                title='Actualización exitosa'
                description='Tu usuario ha sido actualizado exitosamente'
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
                description='Ha ocurrido un error al actualizar tus datos. Inténtalo nuevamente'
            />
        </>
    );
};

export default UpdateUserForm;
