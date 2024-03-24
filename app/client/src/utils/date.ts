import { format } from 'date-fns';

export const fDate = (date: string) => {
  if (isNaN(Date.parse(date))) return;
  return format(new Date(date), 'dd/MM/yyyy');
};

export const fDateTimeBritish = (date: Date | string) => {
  if (!date) return;
  return format(new Date(date), 'dd/MM/yyyy hh:mm a');
};

/*
 * @returns the start of the current week (considering Monday as the first day of the week)
 */
export const getStartOfWeek = () => {
  var currentDate = new Date();

  var currentDayOfWeek = currentDate.getDay(); // sunda = 0, Monday = 1, etc...

  // calculate the difference in days between the current day and the first day of the week (Monday)
  var daysToSubtract = currentDayOfWeek - 1; // Taking Monday(1) as the first day of the week

  if (currentDayOfWeek === 0) {
    // if it's Sunday, we need to consider it as the last day of the week
    daysToSubtract = 6; // Set it to the number of days till Monday
  }

  var beginningOfWeek = new Date(currentDate);
  beginningOfWeek.setDate(currentDate.getDate() - daysToSubtract); // subtract days till the first day of the week

  return beginningOfWeek.toISOString();
};
