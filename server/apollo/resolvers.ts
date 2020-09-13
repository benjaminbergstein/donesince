import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';
import {
  PrismaClient,
  RecordedActivity,
  ActivityType,
  User,
} from "@prisma/client"

import getTrendsSql from '../queries/interval.sql'
import getTimelineSql from '../queries/timeline.sql'
import getTimelineDatesSql from '../queries/timelineDates.sql'
import getSearchTableSql from '../queries/searchTable.sql'
import getWeeklyDimensionStats from '../queries/weeklyDimensionStats.sql'

import {
  CreateActivityTypeArgs,
  SignUpArgs,
  RecordActivityArgs,
  AuthenticateArgs,
  ActivityTypeAttributeArgs,
  TimelineArgs,
  UpdateRecordedActivityArgs,
} from './types'

const prisma = new PrismaClient()
const { SECRET: Secret } = process.env as any

const userId = 1

export default {
  Query: {
    listActivityTypes: async (
      parent: any,
      {
        id = undefined,
        attributeName = undefined,
      }: {
        id?: number,
        attributeName?: string,
      }
    ) => {
      const noFilters = id === undefined && attributeName === undefined
      if (noFilters) return prisma.activityType.findMany()
      if (attributeName !== undefined) return prisma.queryRaw`
        SELECT
          ata.name AS "attributeName",
          ata.value AS "attributeValue",
          at.*

        FROM "ActivityTypeAttribute" ata
        INNER JOIN "ActivityType" at ON at.id = ata."activityTypeId"
        WHERE ata.name = ${attributeName}
        ORDER BY ata.value DESC
      `
      return prisma.activityType.findMany({ where: { id: parseInt(''+id) } })
    },
    listActivityTypeAttributes: async (
      parent: any,
      { activityTypeId }: { activityTypeId?: number }
    ) => prisma.activityTypeAttribute.findMany({
      where: { activityTypeId: parseInt(''+activityTypeId) },
    }),
    recordedActivities: async () => prisma.recordedActivity.findMany({
      where: { recordedBy: { id: userId } },
      include: {
        recordedBy: true,
        activityType: true,
      }
    }),
    activityTrends: async () => prisma.queryRaw(getTrendsSql()),

    weeklyDimensionStats: async (
      parent: any,
      { weekNumber }: { weekNumber?: number },
    ) => prisma.queryRaw(getWeeklyDimensionStats(weekNumber)),

    searchActivityTypes: async (
      parent: any,
      { q }: { q: string },
    ) => prisma.queryRaw(getSearchTableSql({
      q,
      table: 'ActivityType',
      searchField: 'name',
    })),

    searchActivityTypeAttributes: async (
      parent: any,
      { q }: { q: string },
    ) => prisma.queryRaw(getSearchTableSql({
      q,
      table: 'ActivityTypeAttribute',
      searchField: 'name',
    })),

    timeline: async (parent: any, { offset }: TimelineArgs) => prisma.queryRaw(getTimelineSql(offset)),
    timelineDates: async () => prisma.queryRaw(getTimelineDatesSql()),
    me: async() => prisma.user.findOne({ where: { id: userId } })
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

    setActivityTypeAttribute: async (
      parent: any,
      { activityTypeAttributeInput }: { activityTypeAttributeInput: ActivityTypeAttributeArgs }
    ) => {
      const {
        activityTypeId: rawActivityTypeId,
        name,
        value,
      } = activityTypeAttributeInput
      const activityTypeId = parseInt(''+rawActivityTypeId)

      const activityTypeAttribute = await prisma.activityTypeAttribute.upsert({
        where: { activityTypeId_name: { activityTypeId, name } },
        create: {
          activityType: {
            connect: { id: activityTypeId },
          },
          name,
          value,
        },
        update: { value }
      })

      return activityTypeAttribute
    },

    signUp: async (
      parent: any,
      args: { signUpInput: SignUpArgs  },
    ) => {
      const { signUpInput} = args
      const { name } = signUpInput
      const user: User = await prisma.user.create({
        data: { name, apiToken: uuidv4() }
      })
      return user
    },

    authenticate: async (parent: any, args: AuthenticateArgs) => {
      const { signInInput } = args
      const { name } = signInInput
      const user = await prisma.user.findMany({
        where: { name }
      })

      return user[0]
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

    updateRecordedActivity: async (
      parent: any,
      args: { id: number, recordActivityUpdate: UpdateRecordedActivityArgs }
    ) => {
      const { id, recordActivityUpdate } = args
      const { recordedAt } = recordActivityUpdate
      const data = recordedAt !== undefined ? { recordedAt: new Date(recordedAt) } : {}

      const recordedActivity: RecordedActivity = await prisma.recordedActivity.update({
        data,
        where: { id: parseInt(''+id) },
      })

      return recordedActivity
    },
  }
}
