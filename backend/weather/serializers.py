from rest_framework import serializers

from .models import CityQuery


class CityQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = CityQuery
        fields = ['id', 'user', 'city_name', 'timestamp']
