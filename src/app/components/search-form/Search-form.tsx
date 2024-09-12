// 'use client' asegura que este archivo funcione en el navegador y no en el servidor.
import React, { useEffect, useState } from "react"; // Importamos herramientas para hacer cosas cuando la página carga y para guardar datos.
import { useRouter } from 'next/navigation'; // Importamos algo que nos permite movernos entre páginas en Next.js.
import styles from "./search-form.module.scss"; // Traemos los estilos del formulario.
import Form from "../form/Form"; // Importamos un componente de formulario personalizado.
import Select from "../UI/select/Select"; // Importamos un componente de selección personalizado.
import Button from "../UI/button/Button"; // Importamos un componente de botón personalizado.
import Label from "../UI/label/Label"; // Importamos un componente de etiqueta (label) personalizado.

// Esta es la función principal que crea el formulario para buscar.
const SearchForm: React.FC = () => {
  const router = useRouter(); // Obtenemos el "router", que nos permite redirigir a otras páginas.

  // Creamos dos "estados" para guardar el municipio (town) y la EPS seleccionados por el usuario.
  const [selectedTown, setSelectedTown] = useState('');
  const [selectedEPS, setSelectedEPS] = useState('');

  // Creamos dos "estados" para guardar las opciones de municipios y EPS que obtenemos del servidor.
  const [towns, setTowns] = useState<{ label: string, value: string }[]>([]);
  const [eps, setEps] = useState<{ label: string, value: string }[]>([]);

  // Esta parte se ejecuta cuando la página carga.
  useEffect(() => {
    // Función para obtener la lista de municipios desde el servidor.
    const fetchTowns = async () => {
      try {
        const response: Response = await fetch("http://localhost:8080/api/v1/town"); // Llamada a la API para obtener municipios.
        const data = await response.json(); // Convertimos la respuesta a formato JSON.
        const townOptions = data.map((element: any) => ({
          label: element.name, // Guardamos el nombre del municipio.
          value: element.name
        }));
        setTowns(townOptions); // Guardamos las opciones de municipios.
      } catch (error) {
        console.error("Error fetching towns:", error); // Si hay un error, lo mostramos en la consola.
      }
    };
    fetchTowns(); // Llamamos la función para obtener los municipios.

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
  }, []); // Este arreglo vacío significa que solo ejecutamos esto una vez cuando la página carga.

  // Esta función se ejecuta cuando el usuario envía el formulario.
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evitamos que la página se recargue al enviar el formulario.
    console.log(`Selected town: ${selectedTown}, Selected EPS: ${selectedEPS}`); // Mostramos en consola lo que seleccionó el usuario.

    // Redirigimos a otra página con los valores seleccionados como parte de la URL.
    router.push(`/search-results?town=${encodeURIComponent(selectedTown)}&eps=${encodeURIComponent(selectedEPS)}`);
  };

  // Esta función se ejecuta cuando el usuario selecciona un municipio.
  const handleChangeTown = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTown(event.target.value); // Guardamos el municipio seleccionado.
  };

  // Esta función se ejecuta cuando el usuario selecciona una EPS.
  const handleChangeEPS = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEPS(event.target.value); // Guardamos la EPS seleccionada.
  };

  return (
    <div>
      {/* Aquí empieza el formulario */}
      <Form onSubmit={onSubmit} className={styles.searchForm}>
        <div className={styles.formElement}>
          <Label htmlFor="Town" className={styles.label}>
            {/* Texto que le dice al usuario que seleccione su municipio */}
            Selecciona tu <b>municipio</b>
          </Label>
          <Select
            id="Town" // Este es el ID del campo de selección del municipio.
            options={towns} // Las opciones para el campo de selección son los municipios que obtuvimos antes.
            value={selectedTown} // El valor actual es el municipio que el usuario seleccionó.
            onChange={handleChangeTown} // Cuando el usuario cambia la selección, llamamos a la función handleChangeTown.
            className={styles.selectTown} // Usamos esta clase para darle estilo.
            disabled={false} // El campo de selección no está deshabilitado.
          />
        </div>

        <div className={styles.formElement}>
          <Label htmlFor="EPS" className={styles.label}>
            {/* Texto que le dice al usuario que seleccione su EPS */}
            Selecciona tu <b>EPS</b>
          </Label>
          <Select
            id="EPS" // Este es el ID del campo de selección de la EPS.
            options={eps} // Las opciones para el campo de selección son las EPS que obtuvimos antes.
            value={selectedEPS} // El valor actual es la EPS que el usuario seleccionó.
            onChange={handleChangeEPS} // Cuando el usuario cambia la selección, llamamos a la función handleChangeEPS.
            className={styles.selectEPS} // Usamos esta clase para darle estilo.
            disabled={false} // El campo de selección no está deshabilitado.
          />
        </div>

        <Button
          type="submit" // Este botón enviará el formulario cuando se haga clic.
          className={styles.buttonSearch} // Usamos esta clase para darle estilo al botón.
        >
          Enviar {/* Texto del botón */}
        </Button>
      </Form>
    </div>
  );
};

export default SearchForm; // Exportamos el componente para poder usarlo en otras partes de la aplicación.
