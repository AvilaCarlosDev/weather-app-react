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
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
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
        console.log(response.data); // Imprimimos los datos en la consola (puedes eliminar esto en producción)
      });
      // Limpiamos el campo de búsqueda
      setLocation("");
    }
  };

  // Renderizamos el componente
  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          placeholder="Buscar ciudad"
          onChange={(event) => setLocation(event.target.value)}
          value={location}
          onKeyPress={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
            {data.weather && data.weather[0] && (
              <img
                src={getWeatherIconUrl(data.weather[0].icon)}
                alt={data.weather[0].description}
                width="40"
                height="40"
              />
            )}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Sensación</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humedad</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} KM/H</p>
              ) : null}
              <p>Vientos</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Exportamos el componente para que pueda ser utilizado en otros archivos
export default App;
