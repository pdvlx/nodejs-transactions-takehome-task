const BASE_URL = 'http://localhost:3001/api/';

export const fetchContracts = async () => {
  const response = await fetch(`${BASE_URL}contracts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      profile_id: '1',
    },
  });

  return response.json();
};

export const fetchUnpaidJobs = async () => {
  const response = await fetch(`${BASE_URL}jobs/unpaid`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      profile_id: '1',
    },
  });
  return response.json();
};
