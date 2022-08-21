const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review.controller');
const { authenToken } = require('../controllers/authen.controller');

router.get('/', authenToken, reviewController.getAll);
router.get('/:id', authenToken, reviewController.getById);

router.post('/', reviewController.create);

router.put('/', authenToken, reviewController.update);
router.put('/insertCmt', authenToken, reviewController.insertCmt);
router.put('/deleteCmt', authenToken, reviewController.deleteCmt);

router.delete('/:id', authenToken, reviewController.deleteById);

module.exports = router;
