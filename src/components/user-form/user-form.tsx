import React, { useState, useEffect } from "react";
import Button from "../UI/button/Button";
import Input from "../UI/input/Input";
import styles from "./user-form.module.scss";
import Form from "../UI/form/Form";
import Label from "../UI/label/Label";
import Select from "../UI/select/Select";
import { useAuth } from "../context/AuthContext";
import cookie from 'cookie';

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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const responseID = localStorage.getItem('userID');
                if (responseID) {
                    const userID = JSON.parse(responseID);
                    const userResponse = await fetch(`http://localhost:8080/api/v1/users/get/${userID.id}`);
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
            const response: Response = await fetch("http://localhost:8080/api/v1/eps/getAll");
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

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedName || !selectedEps || !selectedEmail || !selectedDocument) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const cookies = cookie.parse(document.cookie || '');
        const token = cookies.auth;

        const responseID = localStorage.getItem('userID');
        if (responseID) {
            const userID = JSON.parse(responseID);

            try {
                const response = await fetch(`http://localhost:8080/api/v1/users/update/${userID.id}`, {
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

                console.log("Actualización exitosa:", data);

            } catch (error) {
                console.error("Error en la solicitud:", error);
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
                            className={styles.updateButton}
                        >Enviar</Button>
                    </div>
                </Form>
            </div >
        </>
    );
};

export default UpdateUserForm;
