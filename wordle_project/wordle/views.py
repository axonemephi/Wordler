import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import render

def index(request):
    return render(request, 'wordle/index.html')

def home(request):
    return render(request, 'wordle/home.html')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORDLIST_PATH = os.path.join(BASE_DIR, 'words', 'wordlist.txt')

with open(WORDLIST_PATH, "r") as f:
    VALID_WORDS = set(word.strip().upper() for word in f if len(word.strip()) == 5)

@csrf_exempt
def validate_guess(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            guess = body.get("guess", "").upper()

            if len(guess) != 5 or not guess.isalpha():
                return JsonResponse({"valid": False, "error": "Invalid word format."})

            if guess in VALID_WORDS:
                return JsonResponse({"valid": True})
            else:
                return JsonResponse({"valid": False, "error": "Word not in dictionary."})
        except json.JSONDecodeError:
            return JsonResponse({"valid": False, "error": "Invalid JSON."})
    return JsonResponse({"error": "Only POST method allowed."}, status=405)