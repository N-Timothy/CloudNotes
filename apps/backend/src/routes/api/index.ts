import Koa from 'koa'
import bodyparser from 'koa-bodyparser'

import {usersRouter} from './users'

const app = new Koa()

app.use(bodyparser())

app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())

export default app
