const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { logger } = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');
const path = require('path');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Logger 
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api', routes);

// Error Handling Middleware
app.use(errorHandler);

//Health Check Endpoint
app.get('/', (req, res) => {
    res.status(200).send('Smartaid Backend is running');
});

module.exports = app;