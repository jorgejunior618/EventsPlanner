const express = require('express');
const InvitedsRoutes = require('./invitedsRoutes');
const GiftsRoutes = require('./giftsRoutes');
const ServicesRoutes = require('./servicesRoutes');

const routes = express();

routes.use(InvitedsRoutes);
routes.use(GiftsRoutes);
routes.use(ServicesRoutes);

module.exports = routes;
