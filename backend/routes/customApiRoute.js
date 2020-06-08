const express = require('express');

const router = express.Router({caseSensitive: true,strict:true});

const controller = require('../controllers/UserInterfaceController');

router.get('/assets',controller.getOraceEloquaApisDetails);

router.get('/assets-types/:parentId',controller.getAccountApis);

router.get('/assets-type-parameters/:parentId/:childId',controller.getCreateAccountApis);

module.exports = router;