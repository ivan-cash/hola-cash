const pad = value => value < 10 ? `0${value}` : value;

// used to calculate UTC offset time zone
export const createDateOffset = (date) => {
  const sign = date.getTimezoneOffset() > 0 ? "-" : "+";
  const offset = Math.abs(date.getTimezoneOffset());
  const hours = pad(Math.floor(offset / 60));
  const minutes = pad(offset % 60);
  return `${sign}${hours}:${minutes}`;
};