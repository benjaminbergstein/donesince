const timeline: (offset?: number) => string = (offset = 1) => `
WITH activities AS (
  SELECT
    ra."id",
    ra."activityTypeId",
    ra."recordedById",
    ra."recordedAt",
    ra."recordedAt" - LAG(ra."recordedAt", 1) OVER recorder AS "sinceLast",
    DATE(TIMEZONE('US/Pacific', ra."recordedAt" AT TIME ZONE 'UTC')) as "recordedAtDate"

  FROM "RecordedActivity" ra

  WINDOW recorder AS (
    PARTITION BY "recordedById"
    ORDER BY "recordedAt" ASC
  )

  ORDER BY 2 DESC
),

datesWithActivities AS (
  SELECT
    TO_CHAR(a."recordedAtDate", 'YYYY-MM-DD') as "rawDate"
  FROM activities a
  GROUP BY 1
  ORDER BY 1 DESC
  LIMIT 1
  OFFSET ${offset}
),

meta AS (
  SELECT

    at.name,
    a."id" AS "recordedActivityId",
    a."activityTypeId",
    a."recordedById",
    a."recordedAt",
    COALESCE(EXTRACT(epoch FROM a."sinceLast") / 3600, -1) AS "sinceLast",
    RANK() OVER date AS "ofDay",
    TO_CHAR(a."recordedAtDate", 'Dy, Mon DD') as "humanReadableDate",
    TO_CHAR(a."recordedAtDate", 'YYYY-MM-DD') as "rawDate"

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
WHERE meta."rawDate" = (SELECT "rawDate" from datesWithActivities LIMIT 1)
`

export default timeline
