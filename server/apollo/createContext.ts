import {
  PrismaClient,
  RecordedActivity,
  ActivityType,
  User,
} from "@prisma/client"
import { IncomingMessage } from 'http'

const prisma = new PrismaClient()

const getUserFromRequest: (authorization: string) => Promise<User | undefined> = async (authorization) => {
  if (authorization === undefined) return undefined

  const matches: RegExpMatchArray | null = authorization.match(/^Bearer (.+)$/)

  if (matches === null) return undefined

  const apiToken = matches[1]
  const users = await prisma.user.findMany({ where: { apiToken } });
  return users[0]
}

export default async ({ req }: { req: IncomingMessage }) => {
  const { authorization = '' } = req.headers
  const user: User | undefined = await getUserFromRequest(authorization)

  return { user };
}
