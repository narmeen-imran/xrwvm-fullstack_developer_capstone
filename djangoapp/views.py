from django.shortcuts import render
from django.http import JsonResponse
import requests

def get_dealerships(request):
    # Fetch dealer data from Node.js microservice
    try:
        response = requests.get('http://localhost:3000/fetchDealers')
        dealers = response.json()
    except Exception:
        dealers = [
            {"id": 1, "name": "Best Cars NYC", "city": "New York", "state": "NY", "address": "123 Main St", "zip": "10001"},
            {"id": 2, "name": "Austin Auto Hub", "city": "Austin", "state": "TX", "address": "456 Oak Rd", "zip": "73301"},
            {"id": 3, "name": "Chicago Motor Group", "city": "Chicago", "state": "IL", "address": "789 Lakefront Dr", "zip": "60601"},
            {"id": 4, "name": "Wichita Auto Center", "city": "Wichita", "state": "Kansas", "address": "555 Sunflower Rd", "zip": "67201"}
        ]
    
    return render(request, 'index.html', {'dealers': dealers})