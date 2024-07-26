const express = require('express');

const { getProfile } = require('./middleware/getProfile');

const contractController = require('./controller/contract.controller');

const router = express.Router();

// Middleware to authenticate users
router.use(getProfile);

// Define routes for contracts
router.get('/contracts/:id', contractController.getContractById);
router.get('/contracts', contractController.getContractsForUser);


module.exports = router;