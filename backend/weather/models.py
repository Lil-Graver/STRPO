from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.

User = get_user_model()

class CityQuery(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    city_name = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.city_name