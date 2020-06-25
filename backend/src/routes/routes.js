const express = require('express');
const InvitedsRoutes = require('./invitedsRoutes');
const GiftsRoutes = require('./giftsRoutes');

const routes = express();

routes.use(InvitedsRoutes);
routes.use(GiftsRoutes);

module.exports = routes;
