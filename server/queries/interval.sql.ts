export default () => `
WITH activities AS (
  SELECT
    ra."activityTypeId",
    ra."recordedById",
    ra."recordedAt",
    ra."recordedAt" - LAG(ra."recordedAt", 1) OVER at_type AS "sinceLast"

  FROM "RecordedActivity" ra

  WINDOW at_type AS (
    PARTITION BY "activityTypeId"
    ORDER BY "recordedAt" ASC
  )

  ORDER BY 2 DESC
)

SELECT
  at.name,
  EXTRACT(epoch FROM AVG(a."sinceLast"))/3600 AS "averageInterval"
FROM activities a

LEFT OUTER JOIN "ActivityType" at
ON at.id = a."activityTypeId"

WHERE a."sinceLast" IS NOT NULL

GROUP BY 1
`
