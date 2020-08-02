const timeline: () => string = () => `
WITH activities AS (
  SELECT
    ra."id",
    ra."activityTypeId",
    ra."recordedById",
    TIMEZONE('US/Pacific', ra."recordedAt" AT TIME ZONE 'UTC') as "recordedAt",
    ra."recordedAt" as "origRecordedAt",
    ra."recordedAt" - LAG(ra."recordedAt", 1) OVER recorder AS "sinceLast",
    DATE(TIMEZONE('US/Pacific', ra."recordedAt" AT TIME ZONE 'UTC')) as "recordedAtDate"

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
    COALESCE(EXTRACT(epoch FROM a."sinceLast") / 3600, -1) AS "sinceLast",
    RANK() OVER date AS "ofDay",
    TO_CHAR(a."recordedAt", 'Dy, Mon DD') as "humanReadableDate"

  FROM activities a

  LEFT OUTER JOIN "ActivityType" at
  ON at.id = a."activityTypeId"

  WINDOW date AS (
    PARTITION BY a."recordedAtDate"
    ORDER BY a."recordedAt" DESC
  )

  ORDER BY 4 DESC
)

SELECT * FROM meta
`

export default timeline
