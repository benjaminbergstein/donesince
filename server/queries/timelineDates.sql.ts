const timelineDates: () => string = () => `
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
    TO_CHAR(a."recordedAtDate", 'YYYY-MM-DD') as "date"
  FROM activities a
  GROUP BY 1
  ORDER BY 1 DESC
)

SELECT * FROM datesWithActivities
`

export default timelineDates
