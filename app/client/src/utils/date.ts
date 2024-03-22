import { format } from 'date-fns'


export const fDate = (date: string) => {
  if (isNaN(Date.parse(date))) return
  return format(new Date(date), 'dd/MM/yyyy')
}

export const fDateTimeBritish = (date: Date | string) => {
  if (!date) return
  return format(new Date(date), 'dd/MM/yyyy hh:mm a')
}

export const getStartOfWeek = () => {
    var currentDate = new Date();

    var currentDayOfWeek = currentDate.getDay();

    // Calculate the difference in days between the current day and the first day of the week (Monday)
    var daysToSubtract = currentDayOfWeek - 1; // Assuming Monday is the first day of the week

    // Subtract the difference to get the date for the beginning of the week
    var beginningOfWeek = new Date(currentDate);
    beginningOfWeek.setDate(currentDate.getDate() - daysToSubtract);

    return beginningOfWeek.toISOString();
}

