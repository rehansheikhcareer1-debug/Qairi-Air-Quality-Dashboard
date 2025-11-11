@echo off
echo Starting FastAPI service on port 8001...
start cmd /k "cd fastapi_service && uvicorn main:app --host 127.0.0.1 --port 8001 --reload"

timeout /t 3 /nobreak >nul

echo Starting Django server on port 8000...
start cmd /k "python manage.py runserver"

echo.
echo Both servers are starting...
echo FastAPI: http://127.0.0.1:8001
echo Django: http://127.0.0.1:8000
echo.
echo Press any key to exit this window (servers will keep running)
pause >nul
