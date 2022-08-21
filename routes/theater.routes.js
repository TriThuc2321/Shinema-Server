const express = require('express');
const router = express.Router();

const theaterController = require('../controllers/theater.controller');
const { authenToken } = require('../controllers/authen.controller');

router.get('/', authenToken, theaterController.getAll);
router.get('/:id', theaterController.getById);

router.post('/', authenToken, theaterController.create);

router.put('/:id', authenToken, theaterController.update);

router.delete('/:id', authenToken, theaterController.deleteById);

module.exports = router;
