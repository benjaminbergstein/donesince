const timeline: () => string = () => `
WITH activities AS (
  SELECT
    ra."id",
    ra."activityTypeId",
    ra."recordedById",
    ra."recordedAt",
    ra."recordedAt" - LAG(ra."recordedAt", 1) OVER recorder AS "sinceLast"

  FROM "RecordedActivity" ra

  WINDOW recorder AS (
    PARTITION BY "recordedById"
    ORDER BY "recordedAt" ASC
  )

  ORDER BY 2 DESC
),

meta AS (
  SELECT

    at.name,
    a."activityTypeId",
    a."recordedById",
    a."recordedAt",
    COALESCE(EXTRACT(epoch FROM a."sinceLast") / 3600, -1) AS "sinceLast"

  FROM activities a

  LEFT OUTER JOIN "ActivityType" at
  ON at.id = a."activityTypeId"

  ORDER BY 4 DESC
)

SELECT * FROM meta
`

export default timeline
