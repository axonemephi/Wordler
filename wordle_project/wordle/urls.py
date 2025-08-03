from django.urls import path
from . import views
from .views import validate_guess, get_target_word

urlpatterns = [
    path('', views.index, name='index'),
    path('home/', views.home, name='home'),
    path("validate-guess/", validate_guess, name="validate_guess"),
    path("get-target-word/", get_target_word, name="get_target_word"),
]

