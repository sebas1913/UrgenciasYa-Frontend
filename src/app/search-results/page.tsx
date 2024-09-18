'use client'; 

import { useEffect, useState } from 'react'; 
import styles from './page-results.module.scss';
import { useSearchParams } from 'next/navigation'; 
import HospitalCard from '../components/hospital-card/Hospital-card';
import Spinner from "../components/UI/spinner/Spinner"; // Importa el spinner

interface Hospital {  
  name: string;           
  phone_number: string;   
  howtogetthere: string;  
  rating: number;         
  url_image: string;      
}

const ResultsPage: React.FC = () => {
  const searchParams = useSearchParams(); 
  const town = searchParams.get('town'); 
  const eps = searchParams.get('eps'); 

  const [results, setResults] = useState<Hospital[] | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response: Response = await fetch(
          `http://localhost:8080/api/v1/hospitals?eps=${encodeURIComponent(eps || '')}&town=${encodeURIComponent(town || '')}&latitude=${encodeURIComponent('123.556')}&longitude=${encodeURIComponent('78.910')}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }

        const data: Hospital[] = await response.json();
        setResults(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (town && eps) {
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
              key={hospital.name} 
              name={hospital.name} 
              url_image={hospital.url_image} 
              phone_number={hospital.phone_number} 
              rating={hospital.rating} 
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
