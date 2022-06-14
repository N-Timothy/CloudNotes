import {env} from 'process'

import Koa, {HttpError} from 'koa'
import bodyparser from 'koa-bodyparser'
import jwt from 'koa-jwt'

import type {ApiRouterParams} from '~/types'

import {usersRouter} from './users'
import {authRouter} from './auth'
import {notesRouter} from './notes'

function apiRouter(params: ApiRouterParams) {
  let app = new Koa()

  app.use(bodyparser())

  app.use(async function jsonErrorHandler(ctx, next) {
    try {
      await next()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: unknown) {
      if (err instanceof HttpError) {
        err.status = err.status || err.statusCode || 500
        ctx.status = err.status
        ctx.body = err
        ctx.app.emit('error', err, ctx)
      }
    }
  })

  let usersApi = usersRouter(params)
  let authApi = authRouter(params)
  let notesApi = notesRouter(params)

  app.use(authApi.routes())
  app.use(authApi.allowedMethods())

  app.use(jwt({secret: `${env.JWT_SECRET}`}))

  app.use(usersApi.routes())
  app.use(notesApi.routes())
  app.use(usersApi.allowedMethods())
  app.use(notesApi.allowedMethods())

  return app
}

export default apiRouter
