from rest_framework.test import APITestCase

class AuthTest(APITestCase):
    def test_register_and_login(self):
        register_data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = self.client.post('http://localhost:8000/api/users/register/', register_data)
        self.assertEqual(response.status_code, 201)

        login_data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = self.client.post('http://localhost:8000/api/users/auth/jwt/create/', login_data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.json())
        self.assertIn('refresh', response.json())