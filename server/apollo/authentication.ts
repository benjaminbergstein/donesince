import {
  PrismaClient,
  User,
} from "@prisma/client"

import { Request, Response, Application } from 'express'
import passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer';

const prisma = new PrismaClient()

export interface UserInfo {
  user?: User
  userId: number
}

const passwordAuthenticationStrategy: (
  name: string,
  password: string,
  done: (err: any, user: UserInfo) => void
) => Promise<void | UserInfo> = (name, password, done) => {
  return prisma.user.findMany({
    where: { name }
  }).then(([user]: User[]) => done(null, {
    userId: user.id,
    user,
  }))
}

passport.use(new BearerStrategy((
  token: string,
  done: (
	err: string | null,
	user: User,
	scope: { scope: string }
  ) => void
) => {
  console.log(token)
  prisma.user.findMany({ where: { apiToken: token } }).then(([user]: User[]) => done(null, user, { scope: 'all' }));
}));

const applyAuthenticationMiddleware: (app: Application) => void = (app) => {
  app.use(passport.initialize())

  app.use((req: Request, res: Response, next: () => void) => {
	passport.authenticate('bearer', { session: false })
	const matches = req.headers.authorization?.match(/Bearer (.+)/)

    if (matches?.length > 0) {
      const [apiToken] = matches
      prisma.user.findMany({ where: { apiToken } }).then(([user]: User[]) => {
        req.user = user
        next()
      });
    } else {
      next()
    }
  })
}

export { applyAuthenticationMiddleware }
