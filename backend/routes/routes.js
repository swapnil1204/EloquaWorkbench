const express = require('express');

const router = express.Router();

const accountController = require('C:/Users/Admin/Desktop/SWAP/PORTQII/EloquaWorkbenchportqii/backend/controllers/accountController.js');

router.post('/account',accountController.account);

module.exports = router;