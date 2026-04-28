# Mejoras Propuestas - Weather App React

## 🎯 Día 2: Mejoras de Seguridad y UX

### Problemas Identificados

1. **API Keys expuestas en el frontend** ⚠️ CRÍTICO
   - `REACT_APP_WEATHER_API_KEY` y `REACT_APP_UNSPLASH_API_KEY` están en el cliente
   - Cualquier usuario puede verlas en DevTools
   - Riesgo: Uso no autorizado, límites excedidos, costos inesperados

2. **Manejo de errores básico**
   - No hay reintentos automáticos cuando la API falla
   - Mensajes de error genéricos para el usuario

3. **Sin cache de respuestas**
   - Cada refresh consume llamadas API innecesarias
   - Lentitud en conexiones lentas

4. **Accesibilidad limitada**
   - Faltan ARIA labels
   - Contraste de colores podría mejorar

### Mejoras Propuestas

#### 1. Proxy Backend para API Keys (CRÍTICO)
```javascript
// Crear backend/simple-proxy.js con Express
app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`
  );
  const data = await response.json();
  res.json(data);
});
```

#### 2. Cache con localStorage
```javascript
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

const getCachedWeather = (city) => {
  const cached = localStorage.getItem(`weather_${city}`);
  if (!cached) return null;
  
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(`weather_${city}`);
    return null;
  }
  return data;
};
```

#### 3. Retry Logic con backoff exponencial
```javascript
const fetchWithRetry = async (url, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await axios.get(url);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
};
```

#### 4. Mejoras de Accesibilidad
- Agregar `aria-label` a botones
- Roles ARIA en secciones dinámicas
- Focus management en loading states

### Plan de Implementación

**Hoy (Día 2):**
- [ ] Agregar cache con localStorage
- [ ] Mejorar mensajes de error
- [ ] Agregar ARIA labels básicos
- [ ] Migrar a Vite
- [ ] Commit: "feat: Add caching + a11y improvements + Vite migration"

**Día 3:**
- [ ] Crear backend proxy simple
- [ ] Mover API keys al backend
- [ ] Commit: "security: Move API keys to backend proxy"

**Día 4:**
- [ ] Implementar retry logic
- [ ] Tests básicos
- [ ] Commit: "feat: Add retry logic with exponential backoff"

---
*Prioridad: 🔴 Crítico | 🟡 Alto | 🟢 Medio*
