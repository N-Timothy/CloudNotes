import Koa, {HttpError} from 'koa'
import bodyparser from 'koa-bodyparser'

import {usersRouter} from './users'
import {authRouter} from './auth'

const app = new Koa()

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

app.use(usersRouter.routes())
app.use(authRouter.routes())
app.use(usersRouter.allowedMethods())
app.use(authRouter.allowedMethods())

export default app
