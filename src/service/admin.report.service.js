const { Job, Contract, Profile } = require('../model');
const { Op } = require('sequelize');

exports.getBestProfession = async (startDate, endDate) => {
  const jobs = await Job.findAll({
    where: {
      paymentDate: {
        [Op.between]: [startDate, endDate],
      },
      paid: true,
    },
    include: [
      {
        model: Contract,
        include: [
          {
            model: Profile,
            as: 'Contractor',
            where: { type: 'contractor' },
          },
        ],
      },
    ],
  });

  const professions = {};

  jobs.forEach((job) => {
    const profession = job.Contract.Contractor.profession;
    professions[profession] = (professions[profession] || 0) + job.price;
  });

  // Check if the object is empty
  if (Object.keys(professions).length === 0) {
    // TODO: create a generic contract for every response.
    return 'No associations found!';
  }

  return Object.keys(professions).reduce((a, b) =>
    professions[a] > professions[b] ? a : b
  );
};

exports.getBestClients = async (startDate, endDate, limit = 2) => {
  const jobs = await Job.findAll({
    where: {
      paymentDate: {
        [Op.between]: [startDate, endDate],
      },
      paid: true,
    },
    include: [
      {
        model: Contract,
        include: [
          {
            model: Profile,
            as: 'Client',
            where: { type: 'client' },
          },
        ],
      },
    ],
  });

  const clients = {};

  jobs.forEach((job) => {
    const clientId = job.Contract.Client.id;
    clients[clientId] = (clients[clientId] || 0) + job.price;
  });

  // Check if the clients object is empty
  if (Object.keys(clients).length === 0) {
    return 'No clients found for the given date range!';
  }

  const sortedClients = Object.keys(clients).sort(
    (a, b) => clients[b] - clients[a]
  );

  return sortedClients
    .slice(0, limit)
    .map((id) => ({ clientId: id, paid: clients[id] }));
};
