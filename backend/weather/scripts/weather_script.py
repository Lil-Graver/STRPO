import requests


def run():
    lat, lon = 55.75, 37.61  # Москва, по умолчанию

    # Запрос к Open-Meteo API
    url = (
        f"https://api.open-meteo.com/v1/forecast?"
        f"latitude={lat}&longitude={lon}&current_weather=true"
    )
    res = requests.get(url)
    data = res.json()

    print(data['current_weather'])