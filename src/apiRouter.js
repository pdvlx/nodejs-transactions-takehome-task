const express = require('express');

const { getProfile } = require('./middleware/getProfile');

const {
  getContractById,
  getContractsForUser,
} = require('./controller/contract.controller');
const { getUnpaidJobs, payForJob } = require('./controller/job.controller');
const {
  depositBalanceController,
  getBalanceController,
} = require('./controller/balance.controller');
const {
  getBestProfessionController,
  getBestClientsController,
} = require('./controller/admin.controller');

const router = express.Router();

// Middleware to authenticate users
router.use(getProfile);

// Define routes for contracts
router.get('/contracts/:id', getContractById);
router.get('/contracts', getContractsForUser);

// Define routes for jobs
router.get('/jobs/unpaid', getUnpaidJobs);
router.post('/jobs/:job_id/pay', payForJob);

// Define routes for balances
router.post('/balances/deposit/:userId', depositBalanceController);
router.get('/balances', getBalanceController); // TODO: delete this.

// Define routes for admin
router.get('/admin/best-profession', getBestProfessionController);
router.get('/admin/best-clients', getBestClientsController);

module.exports = router;
