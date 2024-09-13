import React, { useEffect, useState } from "react";
import styles from './register-form.module.scss'
import Form from "../form/Form";
import Label from "../UI/label/Label";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import Select from "../UI/select/Select";

const RegisterForm: React.FC = () => {

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

    useEffect(() => {
        // Función para obtener la lista de EPS desde el servidor.
        const fetchEps = async () => {
          try {
            const response: Response = await fetch("http://localhost:8080/api/v1/eps"); // Llamada a la API para obtener EPS.
            const data = await response.json(); // Convertimos la respuesta a formato JSON.
            const epsOptions = data.map((element: any) => ({
              label: element.name, // Guardamos el nombre de la EPS.
              value: element.name
            }));
            setEps(epsOptions); // Guardamos las opciones de EPS.
          } catch (error) {
            console.error("Error fetching EPS:", error); // Si hay un error, lo mostramos en la consola.
          }
        };
        fetchEps(); // Llamamos la función para obtener las EPS.
      }, []); 

    const [selectedName, setSelectedName] = useState('');
    const [selectedEps, setSelectedEps] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedPassword, setSelectedPassword] = useState('');
    const [eps, setEps] = useState<{ label: string, value: string }[]>([]);

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
                    >Ingresa tu EPS afiliada:</Label>
                    <Select
                        id="eps" // Este es el ID del campo de selección de la EPS.
                        options={eps} // Las opciones para el campo de selección son las EPS que obtuvimos antes.
                        value={selectedEps} // El valor actual es la EPS que el usuario seleccionó.
                        onChange={handleChangeEps} // Cuando el usuario cambia la selección, llamamos a la función handleChangeEPS.
                        className={styles.selectEPS} // Usamos esta clase para darle estilo.
                        disabled={false} // El campo de selección no está deshabilitado.
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