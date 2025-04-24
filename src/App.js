//Firma: AvilaCarlosDev
// Importamos las dependencias necesarias
import React, { useState } from "react";
import axios from "axios";

// Definimos el componente principal de la aplicación
function App() {
  // Definimos los estados para almacenar los datos del clima y la ubicación
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  // Obtenemos la clave de API desde las variables de entorno
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  // Función para obtener la URL del ícono del clima
  const getWeatherIconUrl = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@4x.png`;
  };

  // Función para manejar la búsqueda de la ubicación cuando se presiona Enter
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      // Definimos la URL de la API de OpenWeatherMap con la ubicación y la clave de API
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

      // Realizamos la solicitud a la API de OpenWeatherMap
      axios.get(url).then((response) => {
        // Actualizamos los datos del clima con la respuesta de la API
        setData(response.data);
      });
      // Limpiamos el campo de búsqueda
      setLocation("");
    }
  };

  // Renderizamos el componente
  return (
    <div className="app-iphone">
      <div className="weather-card">
        <input
          className="search-input"
          type="text"
          placeholder="Buscar ciudad"
          onChange={(event) => setLocation(event.target.value)}
          value={location}
          onKeyPress={searchLocation}
        />
        {data.name && (
          <>
            <div className="city">{data.name}</div>
            <div className="icon-temp">
              {data.weather && data.weather[0] && (
                <img
                  src={getWeatherIconUrl(data.weather[0].icon)}
                  alt={data.weather[0].description}
                  className="weather-icon"
                />
              )}
              {data.main && (
                <div className="temp">{data.main.temp.toFixed()}°</div>
              )}
            </div>
            <div className="desc">
              {data.weather ? data.weather[0].main : ""}
            </div>
            <div className="details-row">
              <div className="detail-card">
                <div className="label">Sensación</div>
                <div className="value">
                  {data.main ? `${data.main.feels_like.toFixed()}°` : "--"}
                </div>
              </div>
              <div className="detail-card">
                <div className="label">Humedad</div>
                <div className="value">
                  {data.main ? `${data.main.humidity}%` : "--"}
                </div>
              </div>
              <div className="detail-card">
                <div className="label">Viento</div>
                <div className="value">
                  {data.wind ? `${data.wind.speed.toFixed()} km/h` : "--"}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Exportamos el componente para que pueda ser utilizado en otros archivos
export default App;
