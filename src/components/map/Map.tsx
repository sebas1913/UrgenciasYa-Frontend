import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { latitude, longitude } from '@/components/location/location';


interface MapComponentProps {
    latitudeHospital: number | null | undefined;
    longitudeHospital: number | null | undefined;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitudeHospital, longitudeHospital }) => {
    useEffect(() => {
        const map = L.map('my_map').setView([6.16820, -75.58851], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        if (latitude && longitude && latitudeHospital && longitudeHospital) {

            const startLatLng = L.latLng(latitude, longitude);
            const endLatLng = L.latLng(latitudeHospital, longitudeHospital);

            L.marker(startLatLng).addTo(map).bindPopup("Mi nueva ubicación").openPopup();
            L.marker(endLatLng).addTo(map).bindPopup("Mi hospital").openPopup();

            const controlRouting = L.Routing.control({
                waypoints: [startLatLng, endLatLng],
                routeWhileDragging: true,
                router: L.Routing.osrmv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1',
                    profile: 'driving'
                }),
                // @ts-ignore
                createMarker: () => null
            }).addTo(map);
        }
        return () => {
            map.remove();
        };
    }, []);

    return (
        <>
            <div id="my_map" style={{ flexGrow: 1, height: '400px', width: '100%' }}></div>
        </>
    );
};

export default MapComponent;