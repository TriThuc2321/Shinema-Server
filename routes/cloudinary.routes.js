const express = require('express');
const router = express.Router();

const controller = require('../controllers/cloudinary.controller');

router.post('/', controller.uploadImages);
module.exports = router;
