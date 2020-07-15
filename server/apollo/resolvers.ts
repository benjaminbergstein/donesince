import jwt from 'jsonwebtoken'
import {
  PrismaClient,
  RecordedActivity,
  ActivityType,
  User,
} from "@prisma/client"

import getTrendsSql from '../queries/interval.sql'

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
      const { activityTypeId } = recordActivityInput
      console.log(activityTypeId, userId)
      const recordedActivity: RecordedActivity = await prisma.recordedActivity.create({
        data: {
          recordedBy: {
            connect: { id: parseInt(''+userId) },
          },
          activityType: {
            connect: { id: parseInt(''+activityTypeId) },
          },
        }
      })
      return recordedActivity
    },
  }


    // games: (parent: any, args: any, context: any, info: any) => {
    //   const { includePlayers } = args
    //   return prisma.game.findMany({ include: {
    //     players: includePlayers,
    //     creator: includePlayers,
    //   } })
    // },

    // players: () => prisma.player.findMany(),

    // cardAttributes: async (parent: any, args: CardIdFilter) => {
    //   const cardIds = args.cardIds.map((cardId) => parseInt(''+cardId))
    //   const cardAttributes = await prisma.cardAttribute.findMany({
    //     where: { card: { id: { in: cardIds } } },
    //   })
    //   return cardAttributes
    // },

    // gameCardsWithAttribute: async (parent: any, args: CardFilter) => {
    //   const { attribute } = args
    //   const whereCard: any = {}

    //   if (attribute) {
    //     whereCard.cardAttributes = { some: attribute }
    //   }

    //   const gameId = parseInt(''+args.gameId)
    //   const cards = await prisma.card.findMany({
    //     where: {
    //       ...whereCard,
    //       game: { id: gameId }
    //     },
    //   })
    //   return cards
    // },

    // gameCards: async (parent: any, args: CardFilter) => {
    //   const { location } = args
    //   const whereCard: any = {}

    //   if (location) {
    //     whereCard.cardAttributes = {
    //       some: { name: "location", value: location },
    //     }
    //   }

    //   const gameId = parseInt(''+args.gameId)
    //   const cards = await prisma.card.findMany({
    //     where: {
    //       ...whereCard,
    //       game: { id: gameId }
    //     },
    //   })
    //   return cards
    // },

    // gameAttributes: async (parent: any, args: GameIdFilter) => {
    //   const gameAttributes = await prisma.gameAttribute.findMany({
    //     where: { game: { id: +args.gameId } },
    //   })
    //   return gameAttributes
    // },

    // me: async (parent: any, args: any) =>  {
    //   const id = authenticateToken(args.token)
    //   return await prisma.player.findOne({ where: { id } })
    // }
  // },

  // Game: {
    // creator: (parent: any) => parent.creator,
    // players: (parent: any) => parent.players,
  // },

  // Mutation: {
    // signIn: async (parent: any, args: SignInArgs) => {
    //   const { name } = args
    //   const players= await prisma.player.findMany({ where: { name } })
    //   const token = generateToken(players[0].id)
    //   return { token }
    // },

    // signUp: async (parent: any, args: SignUpArgs) => {
    //   const { name } = args
    //   const user = await prisma.player.create({ data: { name } })
    //   const token = generateToken(user.id)
    //   return { token }
    // },

    // createGame: async (parent: any, args: CreateGameInput) => {
    //   const { title, token, template } = args
    //   const userId = authenticateToken(token)
    //   const game = await createGame({ userId, template, title })
    //   return game
    // },

    // setCardAttributeValue: async (parent: any, args: SetCardAttributeInput) => {
    //   const { cardId: _cardId, name, value } = args
    //   const cardId = +_cardId
    //   const existingCardAttribute = (await prisma.cardAttribute.findMany({
    //     where: { cardId, name },
    //   }))[0]

    //   if (existingCardAttribute) {
    //     return await prisma.cardAttribute.update({
    //       where: { id: existingCardAttribute.id },
    //       data: { value },
    //     })
    //   }

    //   return await prisma.cardAttribute.create({
    //     data: {
    //       name,
    //       value,
    //       card: { connect: { id: cardId } },
    //     },
    //   })
    // },

    // createGameAttribute: async (parent: any, args: CreateGameAttributeInput) => {
    //   const { name, value, gameId } = args
    //   return await prisma.gameAttribute.create({
    //     data: {
    //       name,
    //       value,
    //       game: {
    //         connect: {
    //           id: gameId,
    //         }
    //       }
    //     },
    //   })
    // },
}
