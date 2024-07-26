const contractService = require('../service/contract.service');

exports.getContractById = async (req, res) => {
  const { id: contractId } = req.params;
  const { id: profileId } = req.profile;

  try {
    const contract = await contractService.getContractById(contractId, profileId);

    if (!contract) {
      // handle errors?
      return res.status(404).json({ error: 'Contract not found' });
    }

    res.json(contract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

exports.getContractsForUser = async (req, res) => {
  const { id: profileId } = req.profile;

  try {
    const contracts = await contractService.getContractsForUser(profileId);
    res.json(contracts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}