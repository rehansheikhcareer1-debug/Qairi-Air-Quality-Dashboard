# Qairi - Air Quality Monitor

Real-time air quality tracking system with interactive maps and weather animations.

Built by Rehan

## Features

- Live AQI data from OpenWeatherMap API
- Interactive location search
- Real-time weather information
- Dynamic weather animations (rain, snow, clouds)
- Historical AQI graphs
- Major pollutants breakdown
- Latest news about air quality
- Multi-page navigation
- Responsive design

## Tech Stack

- React
- Tailwind CSS
- Leaflet Maps
- Chart.js
- OpenWeatherMap API
- News API

## Setup

### Install dependencies
```
npm install
```

### Add API keys
Create `.env` file and add:
```
REACT_APP_OPENWEATHER_API_KEY=your_key
REACT_APP_MAPBOX_TOKEN=your_token
REACT_APP_NEWS_API_KEY=your_key
```

### Run development server
```
npm start
```

Open http://localhost:3000

## Build for production
```
npm run build
```

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── App.js         # Main app
└── index.js       # Entry point
```

## Author

Built by Rehan
