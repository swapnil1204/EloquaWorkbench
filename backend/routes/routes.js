const express = require('express');

const router = express.Router();

const controller = require('../controllers/UserInterfaceController');

router.get('/account',controller.getInstanceDetails);

module.exports = router;