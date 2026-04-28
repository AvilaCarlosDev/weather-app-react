//Firma: AvilaCarlosDev
// Importamos las dependencias necesarias
import React, { useState, useEffect } from "react";
import axios from "axios";

// Definimos el componente principal de la aplicación
function App() {
  // Estados para manejar datos del clima, ubicación, fondo y estados de la app
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(""); // Imagen dinámica
  const [defaultBackground] = useState("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"); // Fondo por defecto
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [isFromCache, setIsFromCache] = useState(false); // Indicador de cache

  // CACHE: Duración del cache en localStorage (10 minutos)
  const CACHE_DURATION = 10 * 60 * 1000;

  // Función para obtener datos del clima desde cache
  const getCachedWeather = (city) => {
    try {
      const cached = localStorage.getItem(`weather_${city.toLowerCase()}`);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;
      
      if (age > CACHE_DURATION) {
        localStorage.removeItem(`weather_${city.toLowerCase()}`);
        return null;
      }
      
      console.log(`✅ Cache hit para ${city} (${Math.round(age/1000)}s)`);
      return data;
    } catch (error) {
      console.error('Error leyendo cache:', error);
      return null;
    }
  };

  // Función para guardar datos en cache
  const setCachedWeather = (city, data) => {
    try {
      localStorage.setItem(`weather_${city.toLowerCase()}`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
      console.log(`💾 Cache guardado para ${city}`);
    } catch (error) {
      console.error('Error guardando cache:', error);
    }
  };

  // Obtenemos las claves de API desde las variables de entorno
  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const unsplashApiKey = process.env.REACT_APP_UNSPLASH_API_KEY;

  // Función para obtener la URL del ícono del clima
  const getWeatherIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@4x.png`;
  };

  // Función para obtener imagen de fondo de Unsplash
  const getBackgroundImage = async (city, country, weatherCondition) => {
    try {
      // Intentar primero con ciudad y clima
      let query = `${city}, ${weatherCondition}`;
      let response = await axios.get(
        `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
          query
        )}&orientation=landscape&client_id=${unsplashApiKey}`
      );

      // Si no hay resultados, intentar solo con la ciudad
      if (!response.data || !response.data.urls) {
        query = city;
        response = await axios.get(
          `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
            query
          )}&orientation=landscape&client_id=${unsplashApiKey}`
        );
      }

      // Si aún no hay resultados, usar imagen genérica del país/región
      if (!response.data || !response.data.urls) {
        query = country;
        response = await axios.get(
          `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
            query
          )}&orientation=landscape&client_id=${unsplashApiKey}`
        );
      }

      if (response.data && response.data.urls && response.data.urls.regular) {
        console.log(`Imagen cargada para: ${city}, ${country}, ${weatherCondition}`);
        setBackgroundImage(response.data.urls.regular);
      } else {
        // Fallback a imagen genérica de clima
        setBackgroundImage(`https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80`);
      }
    } catch (error) {
      console.log("Error obteniendo imagen de fondo:", error);
      // Usar imagen por defecto si falla
      setBackgroundImage(defaultBackground);
    }
  };

  // Función para obtener datos del clima
  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError("");

    try {
      // INTENTAR OBTENER DESDE CACHE PRIMERO
      const cachedData = getCachedWeather(cityName);
      if (cachedData) {
        setWeatherData(cachedData);
        setIsFromCache(true);
        
        // Obtener imagen de fondo basada en la ciudad y clima
        const weatherCondition = cachedData.weather[0].main.toLowerCase();
        const country = cachedData.sys.country;
        await getBackgroundImage(cityName, country, weatherCondition);
        
        setLoading(false);
        return; // Salir temprano, usamos cache
      }

      // Si no hay cache, hacer llamada a API
      console.log(`🌐 Llamando a API para ${cityName}...`);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weatherApiKey}&lang=es`;
      const response = await axios.get(url);

      setWeatherData(response.data);
      setIsFromCache(false);
      
      // GUARDAR EN CACHE
      setCachedWeather(cityName, response.data);

      // Obtener imagen de fondo basada en la ciudad y clima
      const weatherCondition = response.data.weather[0].main.toLowerCase();
      const country = response.data.sys.country;
      await getBackgroundImage(cityName, country, weatherCondition);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("No se pudo encontrar la ciudad. Intenta con otro nombre.");
    } finally {
      setLoading(false);
    }
  };

  // Función para limpiar el fondo y datos
  const clearWeatherData = () => {
    setWeatherData({});
    setBackgroundImage("");
    setError("");
  };

  // Función para manejar la búsqueda de la ubicación
  const searchLocation = (event) => {
    if (event.key === "Enter" && location.trim()) {
      fetchWeatherData(location.trim());
      setLocation("");
    }
  };

  // Función para obtener ubicación actual del usuario
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLoading(true);
          setError("");

          try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherApiKey}&lang=es`;
            const response = await axios.get(url);

            setWeatherData(response.data);
            setCurrentLocation(response.data.name);

            // Obtener imagen de fondo
            const weatherCondition =
              response.data.weather[0].main.toLowerCase();
            const country = response.data.sys.country;
            await getBackgroundImage(
              response.data.name,
              country,
              weatherCondition
            );
          } catch (error) {
            console.error("Error fetching weather data:", error);
            setError("No se pudo obtener el clima de tu ubicación.");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("No se pudo acceder a tu ubicación.");
        }
      );
    } else {
      setError("La geolocalización no está soportada por tu navegador.");
    }
  };

  // No cargar ninguna ciudad por defecto al montar el componente
  // El usuario debe buscar una ciudad para ver el clima

  // Renderizamos el componente
  return (
    <div
      className="app-iphone"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : `url(${defaultBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        transition: "background-image 0.8s ease-in-out",
      }}
    >
      <div className="background-overlay"></div>

      <div className="weather-card">
        {/* Barra de búsqueda */}
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Buscar ciudad..."
            onChange={(event) => setLocation(event.target.value)}
            value={location}
            onKeyPress={searchLocation}
            disabled={loading}
          />
          <button
            className="location-btn"
            onClick={getCurrentLocation}
            disabled={loading}
            title="Mi ubicación"
          >
            📍
          </button>
          {weatherData.name && (
            <button
              className="clear-btn"
              onClick={clearWeatherData}
              disabled={loading}
              title="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        {/* Estado de carga */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando...</p>
          </div>
        )}

        {/* Badge de Cache */}
        {!loading && weatherData.name && isFromCache && (
          <div className="cache-badge" style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(76, 175, 80, 0.9)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            zIndex: 100
          }}>
            ⚡ Datos en cache (10 min)
          </div>
        )}

        {/* Mensaje de error */}
        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {/* Mensaje de bienvenida */}
        {!weatherData.name && !loading && !error && (
          <div className="welcome-message">
            <div className="welcome-icon">🌤️</div>
            <h2>¡Bienvenido!</h2>
            <p>Busca una ciudad para ver el clima actual</p>
            <p className="welcome-subtitle">o usa el botón 📍 para tu ubicación</p>
          </div>
        )}

        {/* Datos del clima */}
        {weatherData.name && !loading && (
          <div className="weather-content">
            <div className="city-info">
              <div className="city">{weatherData.name}</div>
              <div className="country">{weatherData.sys.country}</div>
            </div>

            <div className="icon-temp">
              {weatherData.weather && weatherData.weather[0] && (
                <img
                  src={getWeatherIconUrl(weatherData.weather[0].icon)}
                  alt={weatherData.weather[0].description}
                  className="weather-icon"
                />
              )}
              <div className="temp">{weatherData.main.temp.toFixed()}°C</div>
            </div>

            <div className="desc">
              {weatherData.weather ? weatherData.weather[0].description : ""}
            </div>

            {/* Información adicional */}
            <div className="additional-info">
              <div className="feels-like">
                Sensación térmica: {weatherData.main.feels_like.toFixed()}°C
              </div>
              <div className="temp-range">
                Min: {weatherData.main.temp_min.toFixed()}°C | Max:{" "}
                {weatherData.main.temp_max.toFixed()}°C
              </div>
            </div>

            {/* Tarjetas de detalles */}
            <div className="details-grid">
              <div className="detail-card">
                <div className="detail-icon">💧</div>
                <div className="label">Humedad</div>
                <div className="value">{weatherData.main.humidity}%</div>
              </div>
              <div className="detail-card">
                <div className="detail-icon">💨</div>
                <div className="label">Viento</div>
                <div className="value">
                  {weatherData.wind.speed.toFixed()} m/s
                </div>
              </div>
              <div className="detail-card">
                <div className="detail-icon">📊</div>
                <div className="label">Presión</div>
                <div className="value">{weatherData.main.pressure} hPa</div>
              </div>
              <div className="detail-card">
                <div className="detail-icon">👁️</div>
                <div className="label">Visibilidad</div>
                <div className="value">
                  {weatherData.visibility
                    ? (weatherData.visibility / 1000).toFixed(1)
                    : "N/A"}{" "}
                  km
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Exportamos el componente para que pueda ser utilizado en otros archivos
export default App;
