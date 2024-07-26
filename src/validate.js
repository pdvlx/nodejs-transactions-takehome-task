// TODO: implement joi
exports.validateDateFormat = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    throw new Error('Invalid date format. Please use YYYY-MM-DD format.');
  }
};
