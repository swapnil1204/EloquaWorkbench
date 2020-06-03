const express = require('express');

const router = express.Router();

const controller = require('../controllers/UserInterfaceController');

router.get('/OracleEloquaApis',controller.getOraceEloquaApisDetails);

router.get('/AccountApis/:parentId',controller.getAccountApis);

router.get('/CreateAccountApis/:parentId/:childId',controller.getCreateAccountApis);

module.exports = router;