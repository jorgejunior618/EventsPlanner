const express = require('express');
const InvitedController = require('../controllers/InvitedController');

const router = express();

router.get('/inviteds', InvitedController.read);

module.exports = router;
