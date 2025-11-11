# fastapi_service/main.py
from fastapi import FastAPI
import requests
import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from parent directory (CheckWeather folder)
env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

OPENWEATHER_KEY = os.getenv("OPENWEATHER_KEY", "YOUR_OPENWEATHER_API_KEY")

app = FastAPI(title="AQI + Weather API")

@app.get("/")
def root():
    return {"message": "FastAPI running (AQI service)"}

@app.get("/aqi/{city}")
def get_city_aqi(city: str):
    # 1) geocoding -> lat/lon
    geo_url = f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={OPENWEATHER_KEY}"
    g = requests.get(geo_url, timeout=10)
    if g.status_code != 200 or not g.json():
        return {"error": "Invalid city or geocoding failed"}
    loc = g.json()[0]
    lat, lon = loc.get("lat"), loc.get("lon")
    # 2) current weather
    weather_url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_KEY}&units=metric"
    w = requests.get(weather_url, timeout=10)
    if w.status_code != 200:
        return {"error": "Weather fetch failed"}
    wdata = w.json()
    # 3) air pollution (AQI)
    aqi_url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={OPENWEATHER_KEY}"
    a = requests.get(aqi_url, timeout=10)
    if a.status_code != 200:
        return {"error": "AQI fetch failed"}
    ad = a.json()

    # Parse aqi result (OpenWeather aqi: 1..5)
    aqi_value = ad.get("list", [{}])[0].get("main", {}).get("aqi", None)

    # pollutants (if present)
    components = ad.get("list", [{}])[0].get("components", {})

    return {
        "city": loc.get("name"),
        "country": loc.get("country"),
        "coordinates": {"lat": lat, "lon": lon},
        "weather": {
            "temp": wdata.get("main", {}).get("temp"),
            "feels_like": wdata.get("main", {}).get("feels_like"),
            "humidity": wdata.get("main", {}).get("humidity"),
            "desc": wdata.get("weather", [{}])[0].get("description")
        },
        "aqi_scale_1_5": aqi_value,
        "pollutants": components
    }
