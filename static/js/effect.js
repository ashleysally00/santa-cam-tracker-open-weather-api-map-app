// Add snow/rain effect based on weather conditions
function addWeatherEffect(conditions) {
  if (conditions.includes("snow")) {
    // Snow effect
    L.snow({ density: 50 }).addTo(map);
  } else if (conditions.includes("rain")) {
    // Rain effect
    L.rain({ intensity: 0.5 }).addTo(map);
  }
}

// Fetch weather data and update effects
async function updateWeather(lat, lon) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=704c75359558c294954f04b19d543bea&units=metric`
  );
  const data = await response.json();
  const conditions = data.weather[0].description;
  addWeatherEffect(conditions);
}

// Example: Santa's coordinates
const santaLat = 51.5074;
const santaLon = -0.1278;
updateWeather(santaLat, santaLon);
