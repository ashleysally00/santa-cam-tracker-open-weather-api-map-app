import requests

def get_weather(lat, lon):
    API_KEY = "704c75359558c294954f04b19d543bea"  # Make sure your actual API key is here
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        weather = {
            "temperature": data["main"]["temp"],
            "conditions": data["weather"][0]["description"],
            "wind_speed": data["wind"]["speed"],
        }
        print("Weather data received:", weather)  # Debug print
        return weather
    else:
        print("Failed to fetch weather data:", response.status_code)  # Debug print
        return None

# Test function can stay at the bottom
santa_lat, santa_lon = 51.5074, -0.1278  # Example: London
weather = get_weather(santa_lat, santa_lon)
if weather:
    print(f"Santa's current weather: {weather}")