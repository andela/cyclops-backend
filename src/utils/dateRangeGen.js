import moment from 'moment';

export default (startDate, stopDate) => {
  const dateArray = [];
  startDate = moment(startDate);
  stopDate = moment(stopDate);
  if (stopDate < startDate || startDate < moment()) return []; // throw new Error('Invalid date');
  while (startDate <= stopDate) {
    dateArray.push(moment(startDate).format('DD-MM-YYYY'));
    startDate = moment(startDate).add(1, 'days');
  }
  return dateArray;
};
