// Initialize socket.io with explicit URL
const socket = io("http://localhost:8000", {
  transports: ["websocket"],
  upgrade: false,
});

// Initialize map
const map = L.map("map").setView([51.5074, -0.1278], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Add weather control
const weatherControl = L.control({ position: "topright" });

weatherControl.onAdd = function () {
  const div = L.DomUtil.create("div", "weather-panel");
  div.innerHTML =
    '<h4>Current Weather</h4><div id="weather-info">Loading...</div>';
  div.style.backgroundColor = "white";
  div.style.padding = "10px";
  div.style.borderRadius = "5px";
  return div;
};

weatherControl.addTo(map);

// Add Santa marker
const santaIcon = L.icon({
  iconUrl: "/static/assets/santa-icon.svg",
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, -24],
});

const santaMarker = L.marker([51.5074, -0.1278], { icon: santaIcon }).addTo(
  map
);

// Update Santa's position every 5 seconds
setInterval(() => {
  const newLat = santaMarker.getLatLng().lat + (Math.random() - 0.5) * 0.01;
  const newLng = santaMarker.getLatLng().lng + (Math.random() - 0.5) * 0.01;

  santaMarker.setLatLng([newLat, newLng]);
  map.setView([newLat, newLng]);

  // Emit position update to server
  socket.emit("update_santa_position", {
    lat: newLat,
    lon: newLng,
  });
}, 5000);

// Handle weather updates
socket.on("weather_update", (weatherData) => {
  console.log("Received weather data:", weatherData);
  if (weatherData) {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `
            <p>Temperature: ${weatherData.temperature}°C</p>
            <p>Conditions: ${weatherData.conditions}</p>
            <p>Wind Speed: ${weatherData.wind_speed} m/s</p>
        `;
    addWeatherEffect(weatherData.conditions);
  }
});
