const express = require('express');
const cors = require('cors');
const router = require('./routes/routes');

const server = express();

server.use(express.json());
server.use(cors());
server.use(router);

server.listen(3333);
