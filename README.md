# Qairi - Air Quality Monitoring Dashboard 🌍

A comprehensive full-stack web application for real-time air quality monitoring and weather tracking across 60+ countries worldwide.

## ✅ Features

- **Real-time AQI Monitoring** - Live air quality data from OpenWeather API
- **Weather Integration** - Current weather conditions with beautiful animations
- **60+ Countries Support** - Global coverage with country flags and capitals
- **Interactive Maps** - Leaflet-based location visualization
- **AQI Alerts** - Set custom alerts for air quality changes
- **User Authentication** - Secure login/signup with token-based auth
- **Beautiful UI** - Glassmorphism design with smooth animations
- **Responsive Design** - Works perfectly on all devices
- **Live Clock** - Analog + digital clock with timezone support
- **Health Recommendations** - AQI-based health advice
- **3-Day Forecast** - Air quality predictions

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **Leaflet** - Interactive maps

### Backend
- **Django 5.2** - Python web framework
- **Django REST Framework** - API development
- **FastAPI** - High-performance async API
- **SQLite** - Database

### APIs
- **OpenWeather API** - Weather & AQI data
- **Mapbox** - Map tiles
- **News API** - Environmental news

## 📋 Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/qairi.git
cd qairi
```

### 2. Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Create .env file in root directory
echo "OPENWEATHER_KEY=your_api_key_here" > .env

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_OPENWEATHER_API_KEY=your_api_key_here" > .env
echo "REACT_APP_MAPBOX_TOKEN=your_mapbox_token" >> .env
echo "REACT_APP_NEWS_API_KEY=your_news_api_key" >> .env

# Go back to root
cd ..
```

## 🚀 Running the Application

### Option 1: Using Batch File (Windows - Easiest)
```bash
start_servers.bat
```

### Option 2: Manual Start (3 terminals needed)

**Terminal 1 - Django Backend:**
```bash
python manage.py runserver
```

**Terminal 2 - FastAPI Service:**
```bash
cd fastapi_service
uvicorn main:app --host 127.0.0.1 --port 8001 --reload
```

**Terminal 3 - React Frontend:**
```bash
cd frontend
npm start
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Django Backend**: http://127.0.0.1:8000
- **FastAPI Docs**: http://127.0.0.1:8001/docs
- **Django Admin**: http://127.0.0.1:8000/admin

## 📁 Project Structure

```
CheckWeather/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   └── App.js           # Main app component
│   └── public/              # Static files
├── CheckWeather/            # Django project settings
├── accounts/                # User authentication app
├── dashboard/               # Dashboard app
├── fastapi_service/         # FastAPI service
│   └── main.py             # FastAPI endpoints
├── manage.py               # Django management
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## 🔑 API Keys Required

1. **OpenWeather API** - Get from [openweathermap.org](https://openweathermap.org/api)
2. **Mapbox Token** - Get from [mapbox.com](https://www.mapbox.com/)
3. **News API** - Get from [newsapi.org](https://newsapi.org/)

## 🎨 Features Breakdown

### Home Page
- Real-time AQI display with color-coded indicators
- Current weather with animated backgrounds
- Interactive map with location markers
- Pollutants breakdown (PM2.5, PM10, CO, NO2, SO2, O3)
- AQI trend graphs
- Environmental news feed
- Tourist places recommendations

### Set Alert Page
- Custom AQI threshold settings
- Email notifications
- SMS notifications
- Toggle switches for notification preferences

### Rankings Page
- Global AQI rankings
- Country-wise comparisons
- Historical data

### Profile Page
- User information
- Profile picture upload
- Alert history

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

**Rehan R Sheikh**
- Email: rehan.sheikh.career1@gmail.com
- Phone: +91 7719984704
- Location: Hyderabad, Telangana, India

## 🙏 Acknowledgments

- OpenWeather API for weather and AQI data
- Mapbox for map tiles
- News API for environmental news
- All open-source libraries used in this project

## 📸 Screenshots & Demo

### 🏠 Home Dashboard
Beautiful glassmorphism UI with real-time AQI and weather data

### ⏰ Enhanced Clock Widget
- Working analog clock with moving hands
- Digital time display with gradient effects
- Live timezone and date information

### 🔔 Smart Alert System
Dedicated page for setting custom AQI alerts with email/SMS notifications

### 🗺️ Interactive Maps
Leaflet-based maps with live location markers and coordinates

### 📊 Detailed Analytics
- Real-time pollutant measurements (PM2.5, PM10, CO, NO2, SO2, O3)
- AQI trend graphs and forecasts
- Health recommendations based on current AQI

### 🌍 Global Coverage
60+ countries with flags, capitals, and real-time data

**[View Detailed Screenshots & Features →](SCREENSHOTS.md)**

---

## ✨ Unique Features That Stand Out

### 1. **Professional Clock Widget**
- Fully functional analog clock with hour, minute, and second hands
- Smooth animations and transitions
- Digital display with beautiful gradient text
- Real-time updates every second

### 2. **Smart Alert System**
- Dedicated alert configuration page
- Custom AQI threshold slider (0-300)
- Email and SMS notification toggles
- Settings saved in localStorage

### 3. **Beautiful UI/UX**
- Glassmorphism design throughout
- Weather-based dynamic backgrounds
- Smooth page transitions
- Responsive on all devices

### 4. **Real-time Integration**
- Live AQI data from OpenWeather API
- Automatic data refresh
- Accurate pollutant measurements
- 3-day forecast predictions

### 5. **Interactive Features**
- City search with live suggestions
- Country selector with flags
- Interactive maps with markers
- Click-to-navigate country details

## 🐛 Known Issues

- None currently reported

## 🔮 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Historical data analysis
- [ ] Air quality predictions using ML
- [ ] Social sharing features
- [ ] Multi-language support

---

Made with ❤️ by Rehan R Sheikh
