const express = require('express');
const eventController = require('../controllers/eventController');

const router = express();

router.get('/events', eventController.read);
router.post('/events', eventController.create);
router.put('/events/:id', eventController.update);
router.delete('/events/:id', eventController.delete);

module.exports = router;
