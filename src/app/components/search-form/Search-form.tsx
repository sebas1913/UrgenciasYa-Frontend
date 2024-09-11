import React, { useEffect, useState } from "react";
import styles from "./search-form.module.scss";
import Form from "../form/Form";
import Select from "../UI/select/Select";
import Button from "../UI/button/Button";
import Label from "../UI/label/Label";

const SearchForm: React.FC = () => {

    const [selectedTown, setSelectedTown] = useState('');
  const [selectedEPS, setSelectedEPS] = useState('');

  const [towns, setTowns] = useState<{ label: string, value: string }[]>([]);
  const [eps, setEps] = useState<{ label: string, value: string }[]>([]);

  // Fetch towns from API
  useEffect(() => {
    const fetchTowns = async () => {
        try {
          const response: Response = await fetch("http://localhost:8080/api/v1/town");
          const data = await response.json();
          console.log("Response:", data);

          const townOptions = data.map((element: any) => ({ // tipar diferente 
            label: element.name,   // Replace 'name' with the correct field from your API
            value: element.name     // Replace 'id' with the correct field 
          }));

          setTowns(townOptions);

        } catch (error) {
          console.error("Error fetching towns:", error);
        }
      };
      
    fetchTowns();

    const fetchEps = async () => {
        try {
          const response: Response = await fetch("http://localhost:8080/api/v1/eps");
          const data = await response.json();
          console.log("Response:", data);

          const epsOptions = data.map((element: any) => ({
            label: element.name,   
            value: element.name     
          }));

          setEps(epsOptions);

        } catch (error) {
          console.error("Error fetching towns:", error);
        }
      };
      
    fetchEps();
  }, []); 

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Selected town: ${selectedTown}, Selected EPS: ${selectedEPS}`);
  
    try {
      const response: Response = await fetch(
        `http://localhost:8080/api/v1/hospitals?eps=${encodeURIComponent(selectedEPS)}&town=${encodeURIComponent(selectedTown)}&latitude=${encodeURIComponent('123.556')}&longitude=${encodeURIComponent('78.910')}`
      );
  
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
  
      const data = await response.json();  // Await the promise to get the JSON data
      console.log(data);  // Log the response data
  
    } catch (error) {
      console.error("Error:", error);  // Handle any errors that occur
    }
  };
  
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
                    <Button
                        type='submit'
                        className={styles.buttonSearch}
                    >Enviar</Button>
            </Form>
        </div>
    );
};

export default SearchForm; 