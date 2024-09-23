// src/app/components/Location.tsx
import React, { useEffect, useState } from 'react';

// Declara las variables fuera del componente
export let latitude: number | null = null;
export let longitude: number | null = null;

const Location: React.FC = () => {
  const [location, setLocationState] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          setLocationState({ latitude: lat, longitude: lon });

          // Actualiza las variables globales
          latitude = lat;
          longitude = lon;
          
        },
        (err) => {
          console.error('Error obteniendo la ubicación:', err);
        }
      );
    } else {
      console.error('La geolocalización no está disponible en este navegador.');
    }
  }, []);

  return null;  // No necesitas renderizar nada si solo estás usando la ubicación
};

export default Location;
