const express = require('express');
const giftController = require('../controllers/giftController');

const router = express();

router.get('/gifts', giftController.read);
router.post('/gifts', giftController.create);
router.delete('/gifts/:id', giftController.delete);

module.exports = router;
