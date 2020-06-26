const express = require('express');
const ServicesController = require('../controllers/servicesController');

const router = express();

router.get('/services', ServicesController.read);
router.post('/services', ServicesController.create);
router.put('/services/:id', ServicesController.update);
router.delete('/services/:id', ServicesController.delete);

module.exports = router;
