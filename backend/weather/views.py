import requests
from django.conf import settings
from django.db.models import Count
from rest_framework import status
from rest_framework.permissions import (IsAuthenticated,
                                        IsAuthenticatedOrReadOnly)
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CityQuery
from .serializers import CityQuerySerializer


class WeatherForecastView(APIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        latitude = request.query_params.get("lat")
        longitude = request.query_params.get("lon")
        city_name = request.query_params.get("city")

        if not (latitude and longitude):
            return Response(
                {"error": "Missing required parameters: lat, lon"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Save query to history (if authenticated)
        if request.user.is_authenticated:
            if not city_name:
                return Response({"error": "Missing required parameters: city"})
            CityQuery.objects.create(user=request.user, city_name=city_name)

        # Call Open-Meteo API
        weather_url = "https://api.open-meteo.com/v1/forecast"
        params = {
            "latitude": latitude,
            "longitude": longitude,
            "hourly": "temperature_2m",
            "forecast_days": 1,
            "timezone": "auto",
        }
        response = requests.get(weather_url, params=params)

        if response.status_code != 200:
            return Response({"error": "Weather API error"}, status=500)

        weather_data = response.json()
        return Response(weather_data)


class UserHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queries = CityQuery.objects.filter(user=request.user).order_by('-timestamp')
        serializer = CityQuerySerializer(queries, many=True)
        return Response(serializer.data)
    

class CityStatsView(APIView):
    def get(self, request):
        stats = (
            CityQuery.objects.values('city_name')
            .annotate(count=Count('city_name'))
            .order_by('-count')
        )
        return Response(stats)
    

class CityAutocompleteView(APIView):
    def get(self, request):
        query = request.query_params.get('q')
        if not query:
            return Response({'error': 'Missing query parameter ?q'}, status=400)

        headers = {
            'X-RapidAPI-Key': settings.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
        url = f"https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix={query}&limit=10&minPopulation=1&sort=-population&languageCode=ru"
        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            return Response({'error': 'City autocomplete API error'}, status=500)

        cities = response.json().get('data', [])
        results = [{'city': city['city'], 
                    'country': city['country'], 
                    'longitude': city['longitude'], 
                    'latitude': city['latitude']} for city in cities]
        
        return Response(results, status=200)