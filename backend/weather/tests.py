from rest_framework.test import APITestCase
from unittest.mock import patch
from rest_framework import status

class WeatherForecastTest(APITestCase):
    def test_weather_for_city(self):
        response = self.client.get('http://localhost:8000/api/forecast/?lon=37.6175&lat=55.750555555&city=Москва&country=Россия')
        self.assertEqual(response.status_code, 200)
        self.assertIn('hourly', response.json())

class HistoryTest(APITestCase):
    def test_history(self):
        register_data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = self.client.post('http://localhost:8000/api/users/register/', register_data)

        response = self.client.post('http://localhost:8000/api/users/auth/jwt/create/', register_data)

        tokens = response.json()
        
        response = self.client.get(
            path='http://localhost:8000/api/history/', 
            headers={
                'Authorization': f'Bearer {tokens['access']}'
            }
        )
        self.assertEqual(response.status_code, 200)
        #self.assertIn('hourly', response.json())

class CityAutocompleteTestCase(APITestCase):
    @patch('weather.views.requests.get')
    def test_autocomplete(self, mock_get):
        mock_response = {
            "data": [
                {
                    "city": "Москва",
                    "country": "Россия",
                    "longitude": 37.6175,
                    "latitude": 55.750555555
                },
                {
                    "city": "Новая Москва",
                    "country": "Россия",
                    "longitude": 132.770833333,
                    "latitude": 43.352777777
                },
                {
                    "city": "Москва",
                    "country": "Россия",
                    "longitude": 32.191944444,
                    "latitude": 56.920555555
                }
            ]
        }
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = mock_response

        response = self.client.get('http://localhost:8000/api/autocomplete/?q=Москва')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data[0]['city'], 'Москва')
        