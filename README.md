# Weather Forecast Application

## Overview
This is a full-stack web application that allows users to input a city name and view the weather forecast using the [Open-Meteo API](https://open-meteo.com/). It features city autocomplete, search history tracking, and a suggestion to revisit previously searched cities. The application is built with Django Rest Framework (backend), React (frontend), and PostgreSQL (database), and is containerized using Docker.

## Features
- **Weather Forecast**: Retrieve and display weather forecasts for a given city.
- **Autocomplete**: City input with autocomplete suggestions (using a static city list).
- **Search History**: Save user searches and display search history statistics via an API endpoint.
- **Previous City Suggestion**: Suggest the last searched city on page reload (stored in local storage).
- **Tests**: Unit tests for backend API endpoints.
- **Dockerized**: Backend, frontend, and database run in Docker containers.

## Technologies
- **Backend**: Django Rest Framework, Python, PostgreSQL
- **Frontend**: React, Tailwind CSS, react-select (for autocomplete)
- **API**: Open-Meteo for weather data
- **Containerization**: Docker, docker-compose
- **Testing**: Django's testing framework

## Setup and Running
### Prerequisites
- Docker and Docker Compose installed
- Node.js (for local development, optional)
- Python 3.9+ (for local development, optional)

### Steps to Run
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Set up environment variables**:
   - Copy `.env.example` to `.env` and fill in any required values (e.g., `DATABASE_URL`).

3. **Build and run with Docker**:
   ```bash
   docker-compose up --build
   ```
   - Backend: Runs on `http://localhost:8000`
   - Frontend: Runs on `http://localhost:3000`
   - PostgreSQL: Runs on `localhost:5432` (inside Docker network)

4. **Access the application**:
   - Open `http://localhost:3000` in your browser.
   - API endpoints are available at `http://localhost:8000/api/`.

5. **Run tests (optional)**:
   ```bash
   docker-compose exec backend python manage.py test
   ```

## API Endpoints
- `GET /api/weather/?city=<city_name>`: Fetch weather forecast for a city.
- `GET /api/cities/?q=<query>`: Get city suggestions for autocomplete.
- `GET /api/search-stats/`: Get city search statistics (count of searches per city).

## Notes
- The city autocomplete uses a static `cities.json` file for simplicity. In production, consider using an external API like GeoDB Cities.
- Search history is stored in PostgreSQL and tied to a session (not user accounts, for simplicity).
- The Open-Meteo API is free and requires no API key.