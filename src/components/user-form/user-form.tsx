import React from "react";
import { useState } from "react";
import Button from "../UI/button/Button";
import Input from "../UI/input/Input";
import styles from "./user-form.module.scss";
import Form from "../UI/form/Form";
import Label from "../UI/label/Label";

const UserForm: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [selectedName, setSelectedName] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Enviado :)');
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedName(event.target.value);
    };

    return (
        <div className={styles.formContainer}>
            {isFormVisible ? (
                <>
                    <h2 className={styles.title}>Actualiza tus datos</h2>
                    <Form onSubmit={onSubmit} className={styles.updateForm}>
                        <div className={styles.formElement}>
                            <Label
                                htmlFor="name"
                                className={styles.label}
                            >Ingresa tu nombre completo</Label>
                            <Input
                                id='name'
                                type='text'
                                name='name'
                                value={selectedName}
                                onChange={handleChangeName}
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
                </>
            ) : (
                errorMessage ? (
                    <p className={styles.errorMessage}>{errorMessage} Error</p>
                ) : (
                    <p className={styles.successMessage}>¡Tu info ha sido actualizada!</p>
                )
            )}
        </div>

    );
}


export default UserForm;