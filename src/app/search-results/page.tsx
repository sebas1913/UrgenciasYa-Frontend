'use client';
import { useEffect, useState } from 'react';
import styles from './page-results.module.scss';
import { useSearchParams } from 'next/navigation';
import HospitalCard from '../../components/hospital-card/Hospital-card';
import Spinner from "../../components/UI/spinner/Spinner";
import { IHospital } from '@/interfaces/IHospital';
import { latitude, longitude } from '@/components/location/location';
import { URL_BASE } from '@/config/apiConfig';

const ResultsPage: React.FC = () => {

	// useSearchParam for filter functionalities.

	const searchParams = useSearchParams();
	const town = searchParams.get('town');
	const eps = searchParams.get('eps');

	// useStates hooks needed for implementing the code.

	const [results, setResults] = useState<IHospital[] | null>(null);
	const [loading, setLoading] = useState(true);

	// Function to initialize the search and filter the hospitals according to the user's location and EPS.

	useEffect(() => {
		const fetchHospitals = async () => {
			try {
				let url = '';

				// Verification is made for the search, if there is town, the normal search is performed, but if there is no town, it is based on coordinates.

				if (town && eps) {
					url = `${URL_BASE}/api/v1/hospitals/filter?eps=${encodeURIComponent(eps || '')}&town=${encodeURIComponent(town || '')}`;
				}
				else if (eps && latitude !== null && longitude !== null) {
					url = `${URL_BASE}/api/v1/hospitals/filter?eps=${encodeURIComponent(eps)}&latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}`;
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
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		// Verificatios to run the function to show the hospitals found.

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
							concurrencyProfile={hospital.concurrencyProfile}
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
