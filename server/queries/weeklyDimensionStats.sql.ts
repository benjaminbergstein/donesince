const weeklyDimensionStats: (weekNumber?: number) => string = (weekNumber = -1) => `
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

ata AS (
  SELECT

    name,
    "activityTypeId",
    value

  FROM "ActivityTypeAttribute"
),

weekly_totals AS (
  SELECT

    ata.name as "dimensionName",
    DATE_PART('week', a."recordedAtDate") as "weekNumber",
    SUM(ata.value) AS value

  FROM activities a

  INNER JOIN ata USING ("activityTypeId")

  GROUP BY 1, 2
  ORDER BY 2, 1
),

expanded_weekly_totals AS (
  SELECT

    "dimensionName",
    "weekNumber",
    value,
    value - MAX(value) OVER weeks_window AS "deltaVsBestWeek",
    MAX(value) OVER weeks_window AS "bestWeekValue",
    COALESCE(LAG(value, 1) OVER weeks_window, 0) AS "previousWeekValue",
    COALESCE(value - LAG(value, 1) OVER weeks_window, 0) AS "deltaVsPreviousWeek"

  FROM weekly_totals

  WINDOW weeks_window AS (
    PARTITION BY "dimensionName"
    ORDER BY "weekNumber" ASC
  )

  ORDER BY 2, 1
)

SELECT *

FROM expanded_weekly_totals

${weekNumber != -1 ? `WHERE "weekNumber" = ${weekNumber}` : ''}
`

export default weeklyDimensionStats
