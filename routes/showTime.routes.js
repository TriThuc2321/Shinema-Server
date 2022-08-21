const express = require('express');
const router = express.Router();

const showTimeController = require('../controllers/showTime.controller');
const { authenToken } = require('../controllers/authen.controller');

router.get('/', authenToken, showTimeController.getAll);
router.get('/:id', authenToken, showTimeController.getById);
router.get('/byFilmId/:filmId', showTimeController.getByFilmId);

router.post('/', showTimeController.create);

router.put('/', authenToken, showTimeController.update);
router.put('/byFilmId', authenToken, showTimeController.updateByFilmId);

router.delete('/:id', authenToken, showTimeController.delete);

module.exports = router;
