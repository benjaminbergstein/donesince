export default () => `
WITH activities AS (
  SELECT
    ra."id",
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
),

meta AS (
  SELECT

    at.name,
    a."activityTypeId",
    MAX(a."recordedAt") OVER at_type AS "lastRecordedAt",
    COUNT(a.id) OVER at_type AS "countRecords",
    EXTRACT(epoch FROM a."sinceLast") / 3600 AS "sinceLast",
    STDDEV(EXTRACT(epoch FROM a."sinceLast") / 3600) OVER at_type +
    EXTRACT(epoch FROM AVG(a."sinceLast") OVER at_type) / 3600 AS "oneStdDev"

  FROM activities a

  LEFT OUTER JOIN "ActivityType" at
  ON at.id = a."activityTypeId"

  WHERE a."sinceLast" IS NOT NULL

  WINDOW at_type AS (
    PARTITION BY "activityTypeId"
    ORDER BY "recordedAt" ASC
  )
)

SELECT

  name,
  "activityTypeId",
  MAX("lastRecordedAt") AS "lastRecordedAt",
  MAX("countRecords") AS "countRecords",
  AVG("sinceLast") AS "averageInterval"

FROM meta m

WHERE "sinceLast" < "oneStdDev"

GROUP BY 1, 2
`
