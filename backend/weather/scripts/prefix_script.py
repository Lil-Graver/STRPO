import os
from pprint import pprint

import requests
from django.conf import settings


def run(): 
    headers = {
            'X-RapidAPI-Key': settings.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    
    query = 'Москва'
    url = f"https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix={query}&limit=10&minPopulation=1&sort=-population&languageCode=ru"
    response = requests.get(url, headers=headers)

    cities = response.json().get('data', [])
    results = [{'city': city['city'], 
                'country': city['country'], 
                'longitude': city['longitude'], 
                'latitude': city['latitude'], 
                'population': city['population']} for city in cities]
    
    city = results[0]
    # Call Open-Meteo API
    weather_url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": city['latitude'],
        "longitude": city['longitude'],
        "hourly": "temperature_2m",
        "forecast_days": 1,
        "timezone": "auto",
    }
    response = requests.get(weather_url, params=params)

    weather_data = response.json()

    pprint(weather_data)