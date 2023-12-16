import * as dateFns from 'date-fns';

export const getToday = () => {
  return dateFns.format(new Date(), 'yyyy-MM-dd');
};
