type Item = [string, string]

type Section = [string, Item[]]

const config: Section[] =  [
  [
    "Activity Journal",
    [
      ["/", "Timeline"],
      ["/activity-types", "Activities"],
      ["/activity-trends", "Trends"]
    ],
  ],
  [
    "Dimensions",
    [
      ["/trends", "Trends"],
    ],
  ],
]

export default config
