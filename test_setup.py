#!/usr/bin/env python
"""Quick test to verify setup"""
import sys
import os

print("=" * 50)
print("Testing CheckWeather Setup")
print("=" * 50)

# Test 1: Check if all modules can be imported
print("\n1. Testing imports...")
try:
    import django
    print("   ✓ Django installed")
except ImportError:
    print("   ✗ Django not found")
    sys.exit(1)

try:
    import fastapi
    print("   ✓ FastAPI installed")
except ImportError:
    print("   ✗ FastAPI not found")
    sys.exit(1)

try:
    import uvicorn
    print("   ✓ Uvicorn installed")
except ImportError:
    print("   ✗ Uvicorn not found")
    sys.exit(1)

try:
    import requests
    print("   ✓ Requests installed")
except ImportError:
    print("   ✗ Requests not found")
    sys.exit(1)

try:
    from dotenv import load_dotenv
    print("   ✓ python-dotenv installed")
except ImportError:
    print("   ✗ python-dotenv not found")
    sys.exit(1)

# Test 2: Check .env file
print("\n2. Checking .env file...")
if os.path.exists('.env'):
    print("   ✓ .env file exists")
    load_dotenv()
    api_key = os.getenv('OPENWEATHER_KEY')
    if api_key and api_key != 'YOUR_OPENWEATHER_API_KEY':
        print(f"   ✓ API key loaded: {api_key[:10]}...")
    else:
        print("   ⚠ API key not set or using default")
else:
    print("   ✗ .env file not found")

# Test 3: Check Django settings
print("\n3. Checking Django configuration...")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CheckWeather.settings')
try:
    import django
    django.setup()
    print("   ✓ Django settings loaded")
except Exception as e:
    print(f"   ✗ Django setup failed: {e}")

# Test 4: Check FastAPI app
print("\n4. Checking FastAPI app...")
try:
    sys.path.insert(0, 'fastapi_service')
    from main import app, OPENWEATHER_KEY
    print("   ✓ FastAPI app loaded")
    print(f"   ✓ API key in FastAPI: {OPENWEATHER_KEY[:10]}...")
except Exception as e:
    print(f"   ✗ FastAPI app failed: {e}")

print("\n" + "=" * 50)
print("Setup test completed!")
print("=" * 50)
print("\nNext steps:")
print("1. Run: start_servers.bat")
print("2. Open: http://127.0.0.1:8000")
print("=" * 50)
