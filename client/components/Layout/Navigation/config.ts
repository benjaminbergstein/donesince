type Item = [string, string]

type Section = [string, Item[]]

const config: Section[] =  [
  [
    "Activity Journal",
    [
      ["/", "Timeline"],
      ["/", "Add"]
    ],
  ],
  [
    "Dimensions",
    [
      ["/trends", "Trends"],
      ["/trends", "Manage"],
    ],
  ],
  [
    "Activity Types",
    [
      ["/", "Trends"],
      ["/", "Manage"],
    ],
  ],
]

export default config
