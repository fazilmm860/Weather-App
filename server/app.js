const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const weatherRouter = require('./router/weather');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // Allow cookies to be sent with the request
}));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api', weatherRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
