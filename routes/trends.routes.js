const express = require('express');
const router = express.Router();

const trendsController = require('../controllers/trends.controller');

router.get('/daily-trends/:geo', trendsController.dailyTrends);

module.exports = router;
