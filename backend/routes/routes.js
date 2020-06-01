const express = require('express');

const router = express.Router();

const controller = require('../controllers/UserInterfaceController');

router.get('/OracleEloquaApis',controller.getOraceEloquaApisDetails);

router.get('/AccountApis',controller.getAccountApis);

router.get('/CreateAccountApis',controller.getCreateAccountApis);

module.exports = router;