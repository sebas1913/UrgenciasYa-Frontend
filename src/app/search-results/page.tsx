'use client';
import { useEffect, useState } from 'react';
import styles from './page-results.module.scss';
import { useSearchParams } from 'next/navigation';
import HospitalCard from '../../components/hospital-card/Hospital-card';
import Spinner from "../../components/UI/spinner/Spinner";
import { IHospital } from '@/interfaces/IHospital';

// Importa las variables de latitud y longitud
import { latitude, longitude } from '@/components/location/location';

const ResultsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const town = searchParams.get('town');
  const eps = searchParams.get('eps');

  const [results, setResults] = useState<IHospital[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        let url = '';

        // Si hay `town`, realiza la búsqueda como antes
        if (town && eps) {
          url = `https://urgenciasya-backend.onrender.com/api/v1/hospitals/filter?eps=${encodeURIComponent(eps || '')}&town=${encodeURIComponent(town || '')}`;
        } 
        // Si no hay `town` pero sí `eps`, usa las coordenadas
        else if (eps && latitude !== null && longitude !== null) {
          url = `https://urgenciasya-backend.onrender.com/api/v1/hospitals/filter?eps=${encodeURIComponent(eps)}&latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}`;
        }

        if (url) {
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
          }

          const data: IHospital[] = await response.json();
          setResults(data);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Llama a la función si se cumplen las condiciones
    if ((town && eps) || (eps && latitude !== null && longitude !== null)) {
      fetchHospitals();
    }
  }, [town, eps]);

  if (loading) return <Spinner />;

  return (
    <div className={styles.containerResults}>
      <h1>Resultados de búsqueda:</h1>
      {results && results.length > 0 ? (
        <div className={styles.bigFilterContainer}>
          {results.map((hospital) => (
            <HospitalCard
              id={hospital.id}
              key={hospital.name}
              name={hospital.name}
              url_image={hospital.url_image}
              phone_number={hospital.phone_number}
              rating={hospital.rating}
              howtogetthere={hospital.howtogetthere}
              nameTown={hospital.nameTown}
            />
          ))}
        </div>
      ) : (
        <p>No se encontraron hospitales :(</p>
      )}
    </div>
  );
};

export default ResultsPage;
