'use client'; 
// 'use client' indica que este archivo se ejecutará en el navegador del usuario, no en el servidor.

import { useEffect, useState } from 'react'; 
// Importamos hooks para manejar efectos y estados.

import { useSearchParams } from 'next/navigation'; 
// Hook para acceder a los parámetros de búsqueda en la URL.

// Definimos la interfaz 'Hospital', que describe los datos que recibimos del servidor.
interface Hospital {  
  name: string;           // Nombre del hospital.
  phone_number: string;   // Número de teléfono del hospital.
  howtogetthere: string;  // Indicaciones de cómo llegar al hospital.
  rating: number;         // Puntuación del hospital.
  url_image: string;      // URL de la imagen del hospital.
}

// Función principal que renderiza la página de resultados de hospitales.
const ResultsPage: React.FC = () => {
  const searchParams = useSearchParams(); 
  // Obtenemos los parámetros de búsqueda (ciudad, EPS, etc.) de la URL.

  const town = searchParams.get('town'); 
  // Extraemos el valor del parámetro 'town' (ciudad).

  const eps = searchParams.get('eps'); 
  // Extraemos el valor del parámetro 'eps'.

  // Definimos estados para manejar los resultados, la carga y posibles errores.
  const [results, setResults] = useState<Hospital[] | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  // Hook que ejecuta el fetch de los hospitales al cargar la página o cambiar los parámetros.
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        // Realizamos la petición al servidor con los parámetros de búsqueda.
        const response: Response = await fetch(
          `http://localhost:8080/api/v1/hospitals?eps=${encodeURIComponent(eps || '')}&town=${encodeURIComponent(town || '')}&latitude=${encodeURIComponent('123.556')}&longitude=${encodeURIComponent('78.910')}`
        );

        // Verificamos que la respuesta sea válida.
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }

        // Convertimos la respuesta en un array de hospitales y actualizamos el estado.
        const data: Hospital[] = await response.json();
        setResults(data);
      } catch (error: any) {
        // Si ocurre un error, lo almacenamos en el estado.
        setError(error.message);
      } finally {
        // Indicamos que ya no estamos cargando.
        setLoading(false);
      }
    };

    // Solo realizamos la petición si hay valores en 'town' y 'eps'.
    if (town && eps) {
      fetchHospitals();
    }
  }, [town, eps]); 
  // El efecto se ejecuta nuevamente si cambian 'town' o 'eps'.

  // Renderizamos el contenido de la página:
  if (loading) return <p>Loading...</p>; // Si aún estamos cargando, mostramos un mensaje.
  if (error) return <p>Error: {error}</p>; // Si hubo un error, lo mostramos.

  // Si tenemos resultados, los mostramos en una lista; de lo contrario, mostramos un mensaje de "No se encontraron hospitales".
  return (
    <div>
      <h1>Resultados de los hospitales</h1>
      {results && results.length > 0 ? (
        <ul>
          {results.map((hospital, index) => (
            <li key={index}>
              <h2>{hospital.name}</h2> 
              <img src={hospital.url_image} alt={`Imagen de ${hospital.name}`} width="100" /> 
              <p><strong>Cómo llegar:</strong> {hospital.howtogetthere}</p>
              <p><strong>Teléfono:</strong> {hospital.phone_number}</p>
              <p><strong>Rating:</strong> {hospital.rating}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron hospitales.</p>
      )}
    </div>
  );
};

// Exportamos la página para que pueda ser usada en otros archivos.
export default ResultsPage;
