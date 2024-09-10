import React, { useState } from "react";
import styles from "./search-form.module.scss";
import Form from "../form/Form";
import Select from "../UI/select/Select";
import Button from "../UI/button/Button";
import Label from "../UI/label/Label";

const SearchForm: React.FC = () => {

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert(`selected town: ${selectedTown}, selected EPS: ${selectedEPS}`);
    };

    const towns = [{ label: 'Medellín', value: 'Medellín' }, { label: 'Copacabana', value: 'Copacabana' }, { label: 'Envigado', value: 'Envigado' }, { label: 'Bello', value: 'Bello' }];

    const eps = [{ label: 'Sura', value: 'Sura' }, { label: 'Nueva EPS', value: 'Nueva EPS' }, { label: 'Sanitas', value: 'Sanitas' }];

    const [selectedTown, setSelectedTown] = useState('');
    const [selectedEPS, setSelectedEPS] = useState('');


    const handleChangeTown = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTown(event.target.value);
    };

    const handleChangeEPS = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEPS(event.target.value);
    };

    return (
        <div>
            <Form onSubmit={onSubmit} className={styles.searchForm}>

                <div className={styles.formElement}>
                    <Label
                        htmlFor="Town"
                        label='Selecciona tu municipio'
                        className={styles.label}
                    ></Label>
                    <Select
                        id='Town'
                        options={towns}
                        value={selectedTown}
                        onChange={handleChangeTown}
                        className={styles.selectTown}
                        disabled={false}
                    />
                </div>

                <div className={styles.formElement}>
                    <Label
                        htmlFor="EPS"
                        label='Selecciona tu EPS'
                        className={styles.label}
                    />
                    <Select
                        id='EPS'
                        options={eps}
                        value={selectedEPS}
                        onChange={handleChangeEPS}
                        className={styles.selectEPS}
                        disabled={false}
                    />
                </div>

                <div>
                    <Button
                        type='submit'
                        className={styles.buttonSearch}
                    >Enviar</Button>
                </div>
            </Form>
        </div>
    );
};

export default SearchForm;