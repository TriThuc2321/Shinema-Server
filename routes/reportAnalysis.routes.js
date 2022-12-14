const express = require('express');
const router = express.Router();

const reportAnalysisController = require('../controllers/reportAnalysis.controller');
const { authenToken } = require('../controllers/authen.controller');

router.get('/', reportAnalysisController.getAll);
router.get('/orderByCount', reportAnalysisController.getOrderByCount);
router.get('/orderByDate', reportAnalysisController.getOrderByDate);
router.get('/:id', reportAnalysisController.getById);

router.post('/', reportAnalysisController.plusCount);

router.delete('/:id', authenToken, reportAnalysisController.deleteById);

module.exports = router;
