import jwt from 'jsonwebtoken'
import {
  PrismaClient,
  RecordedActivity,
  ActivityType,
  User,
} from "@prisma/client"

import getTrendsSql from '../queries/interval.sql'
import getTimelineSql from '../queries/timeline.sql'
import getSearchActivityTypesSql from '../queries/searchActivityTypes.sql'

const prisma = new PrismaClient()
const { SECRET: Secret } = process.env as any

interface CreateActivityTypeArgs {
  name: string
}

interface SignUpArgs {
  name: string
}

interface RecordActivityArgs {
  activityTypeId: number
  recordedAt: string
}

const userId = 1

export default {
  Query: {
    listActivityTypes: async () => prisma.activityType.findMany(),
    recordedActivities: async () => prisma.recordedActivity.findMany({
      where: { recordedBy: { id: userId } },
      include: {
        recordedBy: true,
        activityType: true,
      }
    }),
    activityTrends: async () => prisma.queryRaw(getTrendsSql()),
    searchActivityTypes: async (
      parent: any,
      { q }: { q: string },
    ) => prisma.queryRaw(getSearchActivityTypesSql({ q })),
    timeline: async () => prisma.queryRaw(getTimelineSql()),
  },

  Mutation: {
    createActivityType: async (
      parent: any,
      args: { activityTypeInput: CreateActivityTypeArgs },
    ) => {
      const { activityTypeInput } = args
      const { name } = activityTypeInput
      const activityType: ActivityType = await prisma.activityType.create({
        data: { name }
      })
      return activityType
    },

    signUp: async (
      parent: any,
      args: { signUpInput: SignUpArgs  },
    ) => {
      const { signUpInput} = args
      const { name } = signUpInput
      const user: User = await prisma.user.create({
        data: { name }
      })
      return user
    },

    recordActivity: async (
      parent: any,
      args: { recordActivityInput: RecordActivityArgs },
    ) => {
      const { recordActivityInput } = args
      const { activityTypeId, recordedAt } = recordActivityInput
      const data = {
        recordedAt: new Date(parseInt(recordedAt)),
        recordedBy: {
          connect: { id: parseInt(''+userId) },
        },
        activityType: {
          connect: { id: parseInt(''+activityTypeId) },
        },
      }

      const recordedActivity: RecordedActivity = await prisma.recordedActivity.create({
        data,
      })
      return recordedActivity
    },
  }
}
