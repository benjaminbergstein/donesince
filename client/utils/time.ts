interface PluralizeOptions {
  condition?: boolean,
  suffix?: string,
  prefix?: string
  allowZero?: boolean
}

export const pluralize: (
  n: number,
  singular: string,
  plural: string,
  options?: PluralizeOptions,
) => string = (
  n,
  singular,
  plural,
  options = {}
) => {
  const {
    condition = true,
    prefix = '',
    suffix = '',
    allowZero = false,
  } = options

  if (!condition) return ''
  if (n === 0 && allowZero === false) return ''
  return `${prefix}${n} ${n > 1 || n === 0 ? plural : singular}${suffix}`
}

export const formatInterval = (interval: number) => {
  const totalHours = Math.floor(interval)
  const days = Math.floor(totalHours / 24)
  const hours = totalHours % 24
  const minutes = Math.floor(interval * 60) % 60
  const seconds = Math.floor((interval * 60 % 1) * 60)

  const daysStr = pluralize(days, 'day', 'days')
  const hoursStr = pluralize(hours, 'hour', 'hours', { condition: days < 3 || hours > 12 })
  const minStr = pluralize(minutes, 'min', 'mins', { condition: days === 0 })
  const secStr = pluralize(seconds, 'second', 'seconds', { allowZero: true, condition: days === 0 && hours === 0 && minutes === 0 })
  return [daysStr, hoursStr, minStr, secStr].filter((str) => str !== '').join(', ')
}

export const formatDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp))
  return date.toString()
}

export const getWeeks = (d) => {
  // Create a copy of this date object
  var target  = new Date(d.valueOf());

  // ISO week date weeks start on monday
  // so correct the day number
  var dayNr   = (d.getDay() + 6) % 7;

  // Set the target to the thursday of this week so the
  // target date is in the right year
  target.setDate(target.getDate() - dayNr + 3);

  // ISO 8601 states that week 1 is the week
  // with january 4th in it
  var jan4    = new Date(target.getFullYear(), 0, 4);

  // Number of days between target date and january 4th
  var dayDiff = (target - jan4) / 86400000;

  // Calculate week number: Week 1 (january 4th) plus the
  // number of weeks between target date and january 4th
  var weekNr = 1 + Math.ceil(dayDiff / 7);

  return weekNr;
}
