// eslint-disable-next-line arrow-parens
export const getMIlliSeconds = date => (date ? new Date(date).getTime() : new Date().getTime());

export const getDay = (date) => {
  const dateInMillisec = getMIlliSeconds(date);
  return Math.floor(dateInMillisec / 86400000);
};
