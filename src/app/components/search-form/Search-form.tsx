import React, { useState } from "react";
import styles from "./search-form.module.scss";
import Form from "../form/Form";
import Select from "../UI/select/Select";
import Button from "../UI/button/Button";
import Label from "../UI/label/Label";

const SearchForm: React.FC = () => {

    const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
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
                <Label
                htmlFor="Town"
                label='Selecciona tu municipio'
                ></Label>

                <Select
                    id='Town'
                    options={towns}
                    value={selectedTown}
                    onChange={handleChangeTown}
                    className={styles.selectTown}
                    disabled={false} 
                />

                <Label
                htmlFor="EPS"
                label='Selecciona tu EPS'
                />

                <Select
                    id='EPS'
                    options={eps}
                    value={selectedEPS}
                    onChange={handleChangeEPS}
                    className={styles.selectEPS}
                    disabled={false}
                />

                <div>
                    <Button
                        type='submit'
                        label='Buscar'
                        className={styles.buttonSearch}
                    />
                </div>
            </Form>
        </div>
    );
};

export default SearchForm;