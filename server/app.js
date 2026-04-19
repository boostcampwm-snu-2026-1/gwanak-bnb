const express = require('express');
const cors = require('cors');
const accommodationRoutes = require('./routes/accommodations');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/accommodations', accommodationRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
