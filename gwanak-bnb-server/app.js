const express = require('express');
const cors = require('cors');
const accommodationRoute = require('./src/routes/accommodation.route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/accommodations', accommodationRoute);

module.exports = app;
