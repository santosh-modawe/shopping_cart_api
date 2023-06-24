const express = require('express');
const router = express.Router();
require('./category')(router);
require('./product')(router);





module.exports = router