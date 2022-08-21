const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/ticket.controller');
const { authenToken } = require('../controllers/authen.controller');

router.get('/', authenToken, ticketController.getAll);
router.get('/:id', authenToken, ticketController.getById);
router.get('/user/:email', authenToken, ticketController.getByUser);
router.post('/find/bookedSeats/', ticketController.getBookedSeats);

router.post('/', ticketController.create);

router.put('/', authenToken, ticketController.update);

router.delete('/:id', authenToken, ticketController.deleteById);

module.exports = router;
