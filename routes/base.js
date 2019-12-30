const express = require('express');
const baseController = require('../controllers/base');
const router = express.Router();

router.get('/', baseController.baseCtrl);

module.exports = router;
