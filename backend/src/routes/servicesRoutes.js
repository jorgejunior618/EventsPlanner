const express = require('express');
const ServicesController = require('../controllers/servicesController');

const router = express();

router.get('/events/:eventid/services', ServicesController.read);
router.post('/events/:eventid/services', ServicesController.create);
router.put('/events/:eventid/services/:id', ServicesController.update);
router.delete('/events/:eventid/services/:id', ServicesController.delete);

module.exports = router;
