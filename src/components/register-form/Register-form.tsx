import React, { useEffect, useState } from "react";
import styles from './register-form.module.scss'
import Form from "../UI/form/Form";
import Label from "../UI/label/Label";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import Select from "../UI/select/Select";
import Alert from "../UI/alert/Alert";
import { FaRegCircleCheck } from "react-icons/fa6";
import { TiWarningOutline } from "react-icons/ti";



const RegisterForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {

    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [isAlertError, setAlertError] = useState(false);
    const [isAlertNull, setAlertNull] = useState(false);
    const [isAlertPassword, setAlertPassword] = useState(false);
    const [selectedName, setSelectedName] = useState('');
    const [selectedEps, setSelectedEps] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedPassword, setSelectedPassword] = useState('');
    const [selectedDocument, setSelectedDocument] = useState('');
    const [eps, setEps] = useState<{ label: string, value: string }[]>([]);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    const toggleAlertSuccess = () => {
        setAlertSuccess(!isAlertSuccess);
    };

    const toggleAlertNull = () => {
        setAlertNull(!isAlertNull);
    };

    const toggleAlertError = () => {
        setAlertError(!isAlertError);
    };

    const toggleAlertPassword = () => {
        setAlertPassword(!isAlertPassword);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedName || !selectedEps || !selectedEmail || !selectedPassword || !selectedDocument) {
            setAlertNull(true);
            return;
        };

        if (!passwordRegex.test(selectedPassword)) {
            setAlertPassword(true);
            return;
        };

        try {
            const response: Response = await fetch('https://urgenciasya-backend.onrender.com/api/v1/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: selectedName,
                    document: selectedDocument,
                    eps: selectedEps,
                    email: selectedEmail,
                    password: selectedPassword
                }),
            });

            const data = await response.json();
            setAlertSuccess(true);

            setTimeout(() => {
                onSuccess();
            }, 2500);

        } catch (error) {
            console.error("Error en la solicitud:", error);
            setAlertError(true);
        }
    };

    useEffect(() => {
        // Obtener eps
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

                setEps(optionsWithDefault); // Guardamos las opciones de EPS.
            } catch (error) {
                console.error("Error fetching EPS:", error);
            }
        };
        fetchEps(); // Llamamos la función para mostrar las EPS.
    }, []);


    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedName(event.target.value);
    };

    const handleChangeEps = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEps(event.target.value);
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedEmail(event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPassword(event.target.value);
    };

    const handleChangeDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDocument(event.target.value);
    };

    return (
        <>
            <div className={styles.formContainer}>
                <img className={styles.image} src="./images/turquoise_logo.png" ></img>
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
                        ></Input>
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
            
            <Alert
                isVisible={isAlertSuccess}
                onClose={toggleAlertSuccess}
                icono={< FaRegCircleCheck />}
                title='Registro exitoso'
                description='Tu usuario ha sido registrado exitosamente'
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
                description='Ha ocurrido un error al registrar tus datos. Inténtalo nuevamente'
            />

            <Alert
                isVisible={isAlertPassword}
                onClose={toggleAlertPassword}
                icono={< TiWarningOutline />}
                title='¡Oops, ha ocurrido un error!'
                description='La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial'
            />
        </>
    );
};

export default RegisterForm;