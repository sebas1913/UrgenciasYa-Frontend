import React, { useEffect, useState } from "react";
import styles from './register-form.module.scss'
import Form from "../UI/form/Form";
import Label from "../UI/label/Label";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import Select from "../UI/select/Select";

const RegisterForm: React.FC<{onSuccess:() => void}> = ({onSuccess}) => {
    
    const [selectedName, setSelectedName] = useState('');
    const [selectedEps, setSelectedEps] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedPassword, setSelectedPassword] = useState('');
    const [selectedDocument, setSelectedDocument] = useState('');
    const [eps, setEps] = useState<{ label: string, value: string }[]>([]);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedName || !selectedEps || !selectedEmail || !selectedPassword || !selectedDocument) {
            alert('Por favor, completa todos los campos.');
            return;

        };

        try {
            const response: Response = await fetch('http://localhost:8080/register', {
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

            if (!response.ok) {
                throw new Error(`Error en el registro: ${response.statusText}`);
            }

            const data = await response.json(); 
            console.log("Registro exitoso:", data); 
            onSuccess();
            
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    useEffect(() => {
        // Obtener eps
        const fetchEps = async () => {
            try {
                const response: Response = await fetch("http://localhost:8080/api/v1/eps"); 
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
    );
};

export default RegisterForm;