import React, { useState } from "react";
import styles from "./search-form.module.scss";
import Form from "../form/Form";
import Select from "../UI/select/Select";
import Button from "../UI/button/Button";

const SearchForm: React.FC = () => {

    const onSubmit = () => {
        alert('hola mundo')
    }

    const towns = [{ label: 'Medellín', value: 'Medellín' }, { label: 'Copacabana', value: 'Copacabana' }, { label: 'Envigado', value: 'Envigado' }, { label: 'Bello', value: 'Bello' }];

    const eps = [{ label: 'Sura', value: 'Sura' }, { label: 'Nueva EPS', value: 'Nueva EPS' }, { label: 'Sanitas', value: 'Sanitas' }];

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div>
            <Form onSubmit={onSubmit} className={styles.searchForm}>
                <Select
                    options={towns}
                    value={selectedValue}
                    onChange={handleChange}
                    className={styles.selectTown}
                    disabled={false}
                    
                />
                <Select
                    options={eps}
                    value={selectedValue}
                    onChange={handleChange}
                    className={styles.selectEPS}
                    disabled={false}

                />
                <div>
                    <Button
                        type='submit'
                        label="Buscar"
                        className={styles.buttonSearch}
                    />
                </div>
            </Form>
        </div>
    );
};

export default SearchForm;