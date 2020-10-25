export const getCurrentDatestamp: () => string = () => {
  const [month, day, year] = new Date().toLocaleDateString().split('/')
  const datestamp = `${year}-${month}-${day}`
  return datestamp
}
