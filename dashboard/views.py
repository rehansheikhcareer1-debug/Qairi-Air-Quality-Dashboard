from django.shortcuts import render
import requests

def home(request):
    city = request.GET.get('city', 'Delhi')
    url = f"http://127.0.0.1:8001/aqi/{city}"
    
    try:
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
        else:
            data = {"error": "City not found or server error", "city": city}
    except requests.exceptions.ConnectionError:
        data = {"error": "FastAPI service is not running. Please start it on port 8001", "city": city}
    except requests.exceptions.Timeout:
        data = {"error": "Request timeout. Please try again.", "city": city}
    except Exception as e:
        data = {"error": f"An error occurred: {str(e)}", "city": city}
    
    return render(request, 'dashboard/index.html', {'data': data})
