const express = require('express');
const giftController = require('../controllers/giftController');

const router = express();

router.get('/gifts', giftController.read);

module.exports = router;
