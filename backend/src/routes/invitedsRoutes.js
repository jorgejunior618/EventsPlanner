const express = require('express');
const InvitedController = require('../controllers/InvitedController');

const router = express();

router.get('/inviteds', InvitedController.read);
router.post('/inviteds', InvitedController.create);
router.put('/inviteds/:id', InvitedController.update);
router.delete('/inviteds/:id', InvitedController.delete);

module.exports = router;
