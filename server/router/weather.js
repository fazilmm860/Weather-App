const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/weather', async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }
        const apiKey = process.env.API_KEY;
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        const [currentWeatherResponse, forecastResponse] = await Promise.all([
            axios.get(currentWeatherUrl),
            axios.get(forecastUrl)
        ]);

        const { weather, main, wind } = currentWeatherResponse.data;;

        // Extracting required data
        const currentWeatherData = {
            condition: weather[0].main,
            temperature: main.temp,
            humidity: main.humidity,
            windSpeed: wind.speed
        };

        // Extracting temperature forecast for the upcoming week
        const forecastData = forecastResponse.data.list;

        // Filter forecast data for the next 5 days (Sunday to Saturday)
        const weekForecast = {};
        forecastData.forEach(item => {
            const date = new Date(item.dt_txt).getDay();
            if (date >= 0 && date <= 6) {
                // Sunday is 0, Monday is 1, ..., Saturday is 6
                const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date];
                if (!weekForecast[day]) {
                    // If day not already added, add it with temperature
                    weekForecast[day] = item.main.temp;
                } else {
                    // If day already added, update temperature with average
                    weekForecast[day] = (weekForecast[day] + item.main.temp) / 2;
                }
            }
        });

        // Construct the response object
        res.json({ currentWeather: currentWeatherData, weekForecast });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'An error occurred while fetching weather data' });
    }
});

module.exports = router;