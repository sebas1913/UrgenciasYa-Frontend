import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import styles from "./search-form.module.scss";
import Form from "../UI/form/Form";
import Select from "../UI/select/Select";
import Button from "../UI/button/Button";
import Label from "../UI/label/Label";
import { TiWarningOutline } from "react-icons/ti";
import Alert from "../UI/alert/Alert";

const SearchForm: React.FC = () => {
  const router = useRouter();
  const [isAlertNull, setAlertNull] = useState(false);

  const toggleAlertNull = () => {
    setAlertNull(!isAlertNull);
  };

  // Creamos dos "estados" para guardar el municipio y la EPS.
  const [selectedTown, setSelectedTown] = useState('');
  const [selectedEPS, setSelectedEPS] = useState('');

  // Creamos dos "estados" para guardar las opciones de municipios y EPS que obtenemos del servidor.
  const [towns, setTowns] = useState<{ label: string, value: string }[]>([]);
  const [eps, setEps] = useState<{ label: string, value: string }[]>([]);

  useEffect(() => {
    const fetchTowns = async () => {
      try {
        const response: Response = await fetch("https://urgenciasya-backend.onrender.com/api/v1/towns/getAll");
        const data = await response.json();
        const townOptions = data.map((element: any) => ({
          label: element.name,
          value: element.name
        }));

        const defaultOption = { label: 'Ingresa una opción', value: '' };
        const optionsWithDefault = [defaultOption, ...townOptions];

        setTowns(optionsWithDefault);

      } catch (error) {
        console.error("Error fetching towns:", error);
      }
    };

    fetchTowns();

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
    fetchEps(); // Llamamos la función para obtener las EPS.
  }, []); // Este arreglo vacío significa que solo ejecutamos esto una vez cuando la página carga.

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedTown || !selectedEPS) {
      setAlertNull(true)
      return;
    }
    console.log(`Selected town: ${selectedTown}, Selected EPS: ${selectedEPS}`);

    router.push(`/search-results?town=${encodeURIComponent(selectedTown)}&eps=${encodeURIComponent(selectedEPS)}`);
  };

  const handleChangeTown = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTown(event.target.value);
  };

  const handleChangeEPS = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEPS(event.target.value);
  };

  return (
    <>
      <div>
        <Form onSubmit={onSubmit} className={styles.searchForm}>
          <div className={styles.formElement}>
            <Label htmlFor="Town" className={styles.label}>
              Selecciona tu <b>municipio</b>
            </Label>
            <Select
              id="Town"
              options={towns}
              value={selectedTown}
              onChange={handleChangeTown}
              className={styles.selectTown}
              disabled={false}
            />
          </div>

          <div className={styles.formElement}>
            <Label htmlFor="EPS" className={styles.label}>
              Selecciona tu <b>EPS</b>
            </Label>
            <Select
              id="EPS"
              options={eps}
              value={selectedEPS}
              onChange={handleChangeEPS}
              className={styles.selectEPS}
              disabled={false}
            />
          </div>

          <Button
            type="submit"
            className={styles.buttonSearch}
          >
            Enviar
          </Button>
        </Form>
      </div>
      <Alert
        isVisible={isAlertNull}
        onClose={toggleAlertNull}
        icono={< TiWarningOutline />}
        title='¡Oops, ha ocurrido un error!'
        description='Por favor, completa todos los campos'
      />
    </>
  );
};

export default SearchForm; 
