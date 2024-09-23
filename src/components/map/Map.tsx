import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const MapComponent: React.FC = () => {
    useEffect(() => {
        // Inicializa el mapa
        const map = L.map('map').setView([6.16820, -75.58851], 13);

        // Capa de tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Marcadores de inicio y fin
        const startLatLng = L.latLng(6.16820, -75.58851);
        const endLatLng = L.latLng(6.213893, -75.594885);

        L.marker(startLatLng).addTo(map).bindPopup("Mi nueva ubicación").openPopup();
        L.marker(endLatLng).addTo(map).bindPopup("Mi hospital").openPopup();

        // Control de enrutamiento
        const controlRouting = L.Routing.control({
            waypoints: [startLatLng, endLatLng],
            routeWhileDragging: true,
            router: L.Routing.osrmv1({
                serviceUrl: 'https://router.project-osrm.org/route/v1',
                profile: 'driving',
            }),
            createMarker: () => null, // Deshabilitar marcadores adicionales
        }).addTo(map);

        // Limpieza al desmontar el componente
        return () => {
            map.remove();
        };
    }, []);

    return (
        <div id="map" style={{ height: '400px', width: '600px' }}></div>
    );
};

export default MapComponent;