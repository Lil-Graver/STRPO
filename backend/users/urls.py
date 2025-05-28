from django.urls import include, path
from .views import UserCreateView

urlpatterns = [
    path('register/', UserCreateView.as_view()),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]