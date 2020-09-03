interface SearchArgs {
  q: string
  searchField: string
  table: string
}
const searchTable: (args: SearchArgs) => string = ({
  q,
  searchField,
  table,
}) => `
SELECT *

FROM "${table}"

WHERE ${searchField} ILIKE '%${q}%'
`

export default searchTable
