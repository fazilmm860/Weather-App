# Weather App

This is a simple weather application that provides current weather information and a weekly forecast for a given city. The application consists of a Node.js backend server and a React frontend.

## Installation

### Backend (Server)

1. Navigate to the `server` directory.

   ```bash
   cd server
   ```

2. Install the required npm packages.

   ```bash
   npm install
   ```

3. Create an `.env` file in the `server` directory with the following format:

   ```
   PORT=4444
   API_KEY=your_openweathermap_api_key
   ```

   Replace `your_openweathermap_api_key` with your actual OpenWeatherMap API key.

4. Start the server.
   ```bash
   npm start
   ```

### Frontend (React)

1. Install the required npm packages.

   ```bash
   npm install
   ```

2. Start the React development server.
   ```bash
   npm start
   ```

## Usage

### Backend

The backend server provides APIs to fetch weather data for a specified city. The available endpoint is:

- `/api/weather?city=<city_name>`: Retrieves current weather data and a weekly forecast for the specified city.

### Frontend

The frontend interface allows users to input a city name and view its current weather information and weekly forecast. It's a simple interface built with React and Tailwind CSS.

## Development

- **Backend**: The backend server is built with Node.js and Express. It uses Axios to fetch weather data from the OpenWeatherMap API.
- **Frontend**: The frontend is built with React and styled with Tailwind CSS. It fetches weather data from the backend server and displays it to the user.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to contribute to the project.

## License

This project is licensed under the [MIT License](LICENSE).
