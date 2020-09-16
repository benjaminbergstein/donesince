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
    CONCAT(DATE_PART('year', a."recordedAtDate"), '-', DATE_PART('week', a."recordedAtDate")) as "weekNumber",
    SUM(ata.value) AS value,
    COUNT(1) OVER (PARTITION BY ata.name) AS "recordedActivitiesCount"

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
    COALESCE(value - LAG(value, 1) OVER weeks_window, 0) AS "deltaVsPreviousWeek",
    "recordedActivitiesCount"

  FROM weekly_totals

  WHERE "dimensionName" = 'Self-Care'

  WINDOW weeks_window AS (
    PARTITION BY "dimensionName"
    ORDER BY "weekNumber" ASC
  )

  ORDER BY 2, 1
),

week_range AS (
  SELECT generate_series(1, 52) as wn
),

all_weeks AS (
  SELECT
    "dimensionName",
    CONCAT(DATE_PART('year', CURRENT_TIMESTAMP), '-', wn::varchar) as "weekNumber",
    COALESCE(ewt.value, 0) as "value"

  FROM week_range wr

  LEFT OUTER JOIN expanded_weekly_totals ewt ON CONCAT(DATE_PART('year', CURRENT_TIMESTAMP), '-', wn::varchar) = ewt."weekNumber"

  WHERE CONCAT('2020-', wn::varchar) <= CONCAT(DATE_PART('year', CURRENT_TIMESTAMP), '-', DATE_PART('week', CURRENT_TIMESTAMP))
  ORDER BY 2
)

SELECT

jsonb_build_object(
  'labels', jsonb_agg("weekNumber"),
  'datasets', jsonb_build_array(
    jsonb_build_object(
      'label', max("dimensionName"),
      'data', jsonb_agg("value")
    )
  )
) as data

FROM all_weeks
