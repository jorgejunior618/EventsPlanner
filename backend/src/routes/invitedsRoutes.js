const express = require('express');
const InvitedController = require('../controllers/InvitedController');

const router = express();

router.get('/events/:eventid/inviteds', InvitedController.read);
router.post('/events/:eventid/inviteds', InvitedController.create);
router.put('/events/:eventid/inviteds/:id', InvitedController.update);
router.delete('/events/:eventid/inviteds/:id', InvitedController.delete);

module.exports = router;
