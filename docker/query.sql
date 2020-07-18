WITH activities AS (
  SELECT
    ra."id",
    ra."activityTypeId",
    ra."recordedById",
    ra."recordedAt",
    ra."recordedAt" - LAG(ra."recordedAt", 1) OVER recorder AS "sinceLast"

  FROM "RecordedActivity" ra

  recorder AS (
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
    EXTRACT(epoch FROM a."sinceLastUser") / 3600 AS "sinceLast"

  FROM activities a

  LEFT OUTER JOIN "ActivityType" at
  ON at.id = a."activityTypeId"

  ORDER BY 4
)

SELECT * FROM meta
