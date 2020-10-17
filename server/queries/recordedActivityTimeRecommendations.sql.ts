import { PrismaClient } from '@prisma/client'

interface RecordedActivityTimeRecommendation {
  activityTypeId: number
  ofDay: number
  secondsOffset: number
}

const recommendations: (prisma: PrismaClient) => Promise<RecordedActivityTimeRecommendation[]> = async (prisma) => prisma.queryRaw`
WITH activities AS (
  SELECT
    ra."activityTypeId",
    ra."recordedById",
    ra."recordedAt",
    DATE(TIMEZONE('US/Pacific', ra."recordedAt" AT TIME ZONE 'UTC')) as "recordedAtDate",
    TIMEZONE('US/Pacific', ra."recordedAt" AT TIME ZONE 'UTC') as "recordedAtTime"

  FROM "RecordedActivity" ra
),

with_seconds AS (
  SELECT
    "activityTypeId",
    "recordedById",
    "recordedAtDate",
    (
      extract(second from "recordedAtTime") +
      extract(minute from "recordedAtTime") * 60 +
      extract(hour from  "recordedAtTime") * 60 * 60
    ) AS "secondsInDay"

  FROM activities
),

ranked AS (

  SELECT
    "activityTypeId",
    "secondsInDay",
    RANK() OVER activity_type AS "ofDay"

  FROM with_seconds

  WINDOW activity_type AS (
    PARTITION BY "recordedById", "activityTypeId", "recordedAtDate"
    ORDER BY "secondsInDay" ASC
  )

  ORDER BY 1, 3 DESC
)

SELECT
  "activityTypeId",
  "ofDay",
  AVG("secondsInDay") AS "secondsOffset"
FROM ranked r

INNER JOIN "ActivityType" at on at.id = r."activityTypeId"

GROUP BY 1, 2
ORDER BY 1, 3 ASC
`

export default recommendations
