import * as dateFns from 'date-fns';

export const getToday = () => {
  return dateFns.format(new Date(), 'yyyy-MM-dd');
};

/**
 * Check if date is valid in format yyyy-MM-dd and has the format yyyy-MM-dd.
 */
export const isValidDate = (date: string) => {
  if (date.length !== 10) {
    return false;
  }

  return dateFns.isValid(new Date(date));
};

export const addToDate = (date: string, add: dateFns.Duration) => {
  const format = 'yyyy-MM-dd';

  const parsedDate = dateFns.parse(date, format, new Date());

  const addDay = dateFns.add(parsedDate, add);

  return dateFns.format(addDay, format);
};
