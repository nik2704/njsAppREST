const express = require('express');
const dbController = require('../controllers/db');
const router = express.Router();

router.get('/', dbController.baseCtrl);

module.exports = router;
