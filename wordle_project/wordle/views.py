from django.shortcuts import render

def index(request):
    return render(request, 'wordle/index.html')

def home(request):
    return render(request, 'wordle/home.html')
