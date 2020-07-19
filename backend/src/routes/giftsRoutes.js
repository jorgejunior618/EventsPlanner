const express = require('express');
const giftController = require('../controllers/giftController');

const router = express();

router.get('/events/:eventid/gifts', giftController.read);
router.post('/events/:eventid/gifts', giftController.create);
router.put('/events/:eventid/gifts/:id', giftController.update);
router.delete('/events/:eventid/gifts/:id', giftController.delete);

module.exports = router;
