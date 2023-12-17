import * as dateFns from 'date-fns';

/**
 * Check if date is valid in format yyyy-MM-dd and has the format yyyy-MM-dd.
 */
export const isValidDate = (date: string) => {
  if (date.length !== 10) {
    return false;
  }

  return dateFns.isValid(new Date(date));
};
