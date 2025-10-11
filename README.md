# 🌤️ Weather App React

Una aplicación del clima moderna y elegante construida con React que muestra información meteorológica en tiempo real con imágenes de fondo dinámicas.

## ✨ Características

- 🌍 **Búsqueda por ciudad**: Busca cualquier ciudad del mundo
- 📍 **Geolocalización automática**: Obtén el clima de tu ubicación actual
- 🖼️ **Imágenes de fondo dinámicas**: Fondo que cambia según la ciudad y clima
- 🌡️ **Información detallada**: Temperatura, humedad, viento, presión y visibilidad
- 📱 **Diseño responsivo**: Optimizado para móviles y escritorio
- 🎨 **Animaciones suaves**: Transiciones elegantes y efectos visuales
- ⚡ **Estados de carga**: Indicadores de carga y manejo de errores
- 🌐 **Interfaz en español**: Completamente localizada

## 🚀 Instalación

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/weather-app-react.git
   cd weather-app-react
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   # Clave de API de OpenWeatherMap (obligatoria)
   REACT_APP_WEATHER_API_KEY=tu_clave_de_openweathermap_aqui

   # Clave de API de Unsplash (opcional, para imágenes de fondo)
   REACT_APP_UNSPLASH_API_KEY=tu_clave_de_unsplash_aqui
   ```

4. **Obtén las claves de API**

   - **OpenWeatherMap**: Ve a [openweathermap.org](https://openweathermap.org/api) y regístrate para obtener una clave gratuita
   - **Unsplash**: Ve a [unsplash.com/developers](https://unsplash.com/developers) para obtener una clave (opcional)

5. **Ejecuta la aplicación**

   ```bash
   pnpm run dev
   # o
   npm start
   ```

   La aplicación se abrirá en [http://localhost:5000](http://localhost:5000)

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework de JavaScript para interfaces de usuario
- **Axios** - Cliente HTTP para peticiones a APIs
- **CSS3** - Estilos modernos con animaciones y efectos glassmorphism
- **OpenWeatherMap API** - Datos meteorológicos en tiempo real
- **Unsplash API** - Imágenes de alta calidad para fondos dinámicos

## 📱 Funcionalidades

### Búsqueda de Ciudades

- Escribe el nombre de cualquier ciudad en el mundo
- Presiona Enter para buscar
- Obtén información meteorológica detallada

### Geolocalización

- Haz clic en el botón 📍 para obtener tu ubicación actual
- El navegador solicitará permisos de ubicación
- Automáticamente carga el clima de tu posición

### Imágenes de Fondo Dinámicas

- Las imágenes cambian según la ciudad seleccionada
- Se adaptan al tipo de clima actual (soleado, nublado, lluvioso, etc.)
- Transiciones suaves entre cambios de fondo

### Información Meteorológica

- **Temperatura actual** y sensación térmica
- **Rango de temperaturas** (mínima y máxima)
- **Humedad relativa** del aire
- **Velocidad del viento** en m/s
- **Presión atmosférica** en hPa
- **Visibilidad** en kilómetros

## 🎨 Diseño

La aplicación utiliza un diseño moderno con:

- **Efecto Glassmorphism**: Tarjetas translúcidas con blur
- **Animaciones CSS**: Transiciones suaves y efectos de hover
- **Responsive Design**: Adaptable a cualquier tamaño de pantalla
- **Paleta de colores**: Tonos azules y blancos para una apariencia limpia

## 📦 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `pnpm run dev` o `npm start`

Ejecuta la aplicación en modo desarrollo.
Abre [http://localhost:5000](http://localhost:5000) para verla en el navegador.

### `npm test`

Lanza el corredor de pruebas en modo interactivo.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.

### `npm run eject`

**Nota: Esta es una operación de una sola vez. Una vez que `eject`, no puedes volver atrás!**

## 🌟 Mejoras Implementadas

- ✅ **Refactorización completa del código** con mejor estructura
- ✅ **Sistema de imágenes de fondo dinámico** basado en ubicación y clima
- ✅ **Integración con Unsplash API** para imágenes de alta calidad
- ✅ **Geolocalización automática** del usuario
- ✅ **Manejo robusto de errores** y estados de carga
- ✅ **Animaciones y transiciones suaves** para mejor UX
- ✅ **Información meteorológica extendida** con más detalles
- ✅ **Diseño responsivo mejorado** para todos los dispositivos
- ✅ **Interfaz en español** completamente localizada

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**AvilaCarlosDev**

- GitHub: [@tu-usuario](https://github.com/tu-usuario)

---

⭐ ¡No olvides dar una estrella si te gusta este proyecto!

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
