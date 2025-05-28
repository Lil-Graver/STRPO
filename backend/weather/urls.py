from django.urls import include, path

from .views import (CityAutocompleteView, CityStatsView, UserHistoryView,
                    WeatherForecastView)

urlpatterns = [
    path('forecast/', WeatherForecastView.as_view()),
    path('history/', UserHistoryView.as_view()),
    path('autocomplete/', CityAutocompleteView.as_view()),
    path('stats/', CityStatsView.as_view()),
    path('users/', include('users.urls')),
]