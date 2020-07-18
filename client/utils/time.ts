interface PluralizeOptions {
  condition?: boolean,
  suffix?: string,
  prefix?: string
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
    suffix = ''
  } = options

  if (!condition) return ''
  if (n === 0) return ''
  return `${prefix}${n} ${n > 1 ? plural : singular}${suffix}`
}

export const formatInterval = (interval: number) => {
  const hours = Math.floor(interval)
  const minutes = Math.floor(interval * 60) % 60
  const seconds = Math.floor((interval * 60 % 1) * 60)

  const hoursStr = pluralize(hours, 'hour', 'hours')
  const minStr = pluralize(minutes, 'min', 'mins')
  const secStr = pluralize(seconds, 'second', 'seconds', { condition: hours === 0 && minutes === 0 })
  return [hoursStr, minStr, secStr].filter((str) => str !== '').join(', ')
}

export const formatDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp))
  return date.toString()
}
