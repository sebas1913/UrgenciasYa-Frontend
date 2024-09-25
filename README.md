
# Urgencias Ya

"**Urgencias Ya**" es una aplicación desarrollada en **Next.js 14.2.7** que permite a los usuarios encontrar hospitales cercanos en caso de emergencia, filtrando por su EPS (Entidad Prestadora de Salud). Además, muestra la ubicación de los hospitales en un mapa interactivo y ofrece funcionalidades adicionales como rutas de emergencia, calificaciones de los hospitales, y un sistema de chat para urgencias.

## Características Principales

- Filtrado por EPS para encontrar hospitales que atiendan emergencias.
- Mapa interactivo utilizando.
- Rutas de emergencia desde la ubicación del usuario al hospital.
- Sistema de calificación de hospitales.
- Chat de urgencias en tiempo real.
- Generación de documentos PDF con la información de la atención recibida.
- Autenticación de usuarios y manejo de tokens JWT.

## Tecnologías Utilizadas

- **Next.js** (v14.2.7)
- **React** (v18)
- **Firebase**: Almacenamiento de datos de chat.
- **Leaflet & Leaflet Routing Machine**: Mapas y rutas.
- **Nodemailer**: Envío de correos electrónicos.
- **Sass**: Estilos.
- **Swiper**: Carrusel para mostrar hospitales.
- **Recharts**: Gráficos de datos médicos y calificaciones.
- **JWT**: Manejo de autenticación.
- **JSPDF**: Generación de documentos en formato PDF.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/usuario/urgencias-ya.git
   ```

2. Dirígete al directorio del proyecto:
   ```bash
   cd urgencias-ya
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Configura las variables de entorno, incluyendo:
   - **Firebase** para el chat
   - **API de EPS** para las consultas

5. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo de desarrollo.
- `npm run build`: Realiza el build de la aplicación para producción.
- `npm start`: Inicia la aplicación en producción.
- `npm run lint`: Ejecuta linters para verificar el código.

## Dependencias Principales

- **firebase**: ^10.13.1
- **leaflet**: ^1.9.4
- **nodemailer**: ^6.9.15
- **jspdf**: ^2.5.2
- **swiper**: ^11.1.12
- **sass**: ^1.78.0
- **react-icons**: ^5.3.0


