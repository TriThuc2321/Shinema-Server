/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account.controller');
const { authenToken } = require('../controllers/authen.controller');

router.get('/', accountController.getAll);
router.get('/:email', accountController.getByEmail);

router.get('/staff/all', accountController.getAllStaff);
router.get('/getById/:id', accountController.getById);

router.post('/', accountController.create);
router.post('/checkEmail/:email', accountController.checkEmail);

router.put('/', accountController.update);
router.put('/password', accountController.updatePassword);

router.delete('/:email', accountController.deleteByEmail);

module.exports = router;
