import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './index.css'; // Import your CSS file here

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [weekForecast, setWeekForecast] = useState([]);
    const [city, setCity] = useState('');

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(`http://localhost:4444/api/weather?city=${city}`);
                setWeatherData(response.data.currentWeather);
                // Update weekForecast to an array of objects with day and temperature
                setWeekForecast(Object.entries(response.data.weekForecast).map(([day, temperature]) => ({ day, temperature })));
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        if (city) {
            fetchWeatherData();
        }
    }, [city]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <div className="container">
            <div className="weather-side">
                <div className="weather-gradient"></div>
                <div className="date-container">
                    {/* Date and location */}
                    <h2 className="date-dayname">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</h2>
                    <span className="date-day">{new Date().toUTCString().slice(5, 16)}</span>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span className="location">{city}</span>
                </div>
                <div className="weather-container">
                    {/* Weather icon, temperature, and description */}
                    <span className="weather-icon">{weatherData ? weatherData.condition : 'Loading...'}</span>
                    <h1 className="weather-temp">{weatherData ? `${weatherData.temperature}°C` : 'Loading...'}</h1>
                    <h3 className="weather-desc">{weatherData ? weatherData.description : 'Loading...'}</h3>
                </div>
            </div>
            <div className="info-side">
                <div className="today-info-container">
                    <div className="today-info">
                        {/* Humidity and wind */}
                        <div className="humidity">
                            <span className="title"><FontAwesomeIcon icon={faDroplet} /> HUMIDITY</span>
                            <span className="value">{weatherData ? `${weatherData.humidity}%` : 'Loading...'}</span>
                            <div className="clear"></div>
                        </div>
                        <div className="wind">
                            <span className="title"><FontAwesomeIcon icon={faWind} /> WIND</span>
                            <span className="value">{weatherData ? `${weatherData.windSpeed} m/s` : 'Loading...'}</span>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
                <div className="week-container">
                    {/* Weekly forecast */}
                    <ul className="week-list">
                        {weekForecast.map(({ day, temperature }) => (
                            <li key={day}>
                                <span className="day-name">{day}</span>
                                <span className="day-temp">{temperature}°C</span>
                                <span className="day-icon">☁️</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="location-container">
                    {/* Location input */}
                    <input className="location-input" type="text" id="city" value={city} onChange={handleCityChange} />
                </div>
            </div>
        </div>
    );
}; 

export default Weather;
