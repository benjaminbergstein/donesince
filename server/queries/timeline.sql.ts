import { PrismaClient } from '@prisma/client'

interface TimelineStat {
  id: number,
  activityTypeId: number,
  recordedById: number,
  recordedAt: string,
  sinceLast: number
  recordedAtDate: string
}

const timeline: (
  prisma: PrismaClient,
  date: string,
  userId: number
) => Promise<TimelineStat[]> = async (
  prisma,
  date,
  userId
) => prisma.queryRaw`
WITH activities AS (
  SELECT
    ra."id",
    ra."activityTypeId",
    ra."recordedById",
    ra."recordedAt",
    ra."recordedAt" - LAG(ra."recordedAt", 1) OVER recorder AS "sinceLast",
    DATE(TIMEZONE('US/Pacific', ra."recordedAt" AT TIME ZONE 'UTC')) as "recordedAtDate"

  FROM "RecordedActivity" ra

  WHERE ra."recordedById" = ${userId}

  WINDOW recorder AS (
    PARTITION BY "recordedById"
    ORDER BY "recordedAt" ASC
  )

  ORDER BY 2 DESC
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
WHERE meta."rawDate" = ${date}
`

export default timeline
