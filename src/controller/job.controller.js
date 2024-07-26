const jobService = require('../service/job.service');

exports.getUnpaidJobs = async (req, res) => {
  try {
    const jobs = await jobService.getUnpaidJobs(req.profile.id);
    res.json(jobs);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.payForJob = async (req, res) => {
  try {
    await jobService.payForJob(req.profile.id, req.params.job_id);
    res.status(200).send('Payment successful');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
