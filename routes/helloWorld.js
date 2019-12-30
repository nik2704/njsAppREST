const express = require('express');
const helloController = require('../controllers/helloWorld');
const router = express.Router();

router.get('/', helloController.helloWorld);

module.exports = router;
