const ONE_DAY = 24 * 60 * 60 * 1000;

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1);
} 

function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0);
}

function getDayOfWeek(date) {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
}

function generateDate(up, to, timeUTC, activeDate = false) {
  const result = [];
  let startTime = timeUTC;
  
  for (let i = up; i <= to; i++) {
    result.push({day: i, activeDate, 'timeUTC': startTime});
    startTime += ONE_DAY;
  }

  return result;
}


/* Предыдущий месяц */
function getDaysPreviousMonth(currentYear, currentMonth) {
  const firstDayOfWeek = getDayOfWeek(getFirstDayOfMonth(currentYear, currentMonth));
  const previousMonthDay = getLastDayOfMonth(currentYear, currentMonth - 1).getDate();
  
  if (firstDayOfWeek === 0) return [];
  
  const firsNumInCalendar = previousMonthDay - firstDayOfWeek + 1;
  const firsNumInCalendarUTC = new Date(currentYear, currentMonth - 1, firsNumInCalendar).getTime();
    
  return generateDate(firsNumInCalendar, previousMonthDay, firsNumInCalendarUTC);
}


/* Текущий месяц */
function getDaysCurrentMonth(currentYear, currentMonth) {
  const lastDayOfMonth = getLastDayOfMonth(currentYear, currentMonth ).getDate();
  const firsNumInCalendarUTC = new Date(currentYear, currentMonth, 1).getTime();

  return generateDate(1, lastDayOfMonth, firsNumInCalendarUTC, true);
}

/* Следующий месяц */
function getDaysNextMonth(currentYear, currentMonth) {
  const lastDayOfMonth = getDayOfWeek(getLastDayOfMonth(currentYear, currentMonth ))

  if (lastDayOfMonth === 6) return [];

  const firsNumInCalendarUTC = new Date(currentYear, currentMonth + 1, 1).getTime();

 return generateDate(1, 6 - lastDayOfMonth, firsNumInCalendarUTC)
}

export default function getFullCalendar(date) {
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  
  return [
    ...getDaysPreviousMonth(currentYear, currentMonth),
    ...getDaysCurrentMonth(currentYear, currentMonth),
    ...getDaysNextMonth(currentYear, currentMonth)
  ]
}
