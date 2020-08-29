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
