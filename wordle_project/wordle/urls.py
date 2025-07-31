from django.urls import path
from . import views
from .views import validate_guess

urlpatterns = [
    path('', views.index, name='index'),
    path('home/', views.home, name='home'),
    path("validate-guess/", validate_guess, name="validate_guess"),
]

