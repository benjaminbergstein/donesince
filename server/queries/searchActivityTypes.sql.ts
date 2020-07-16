interface SearchArgs {
  q: string
}
const searchActivityTypes: (args: SearchArgs) => string = ({ q }) => `
SELECT *

FROM "ActivityType"

WHERE name ILIKE '%${q}%'
`

export default searchActivityTypes
