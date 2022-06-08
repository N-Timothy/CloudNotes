import Router from '@koa/router'

import {User} from '~/models/User'

import {sequelize, setupDB} from '~/db'
import {AuthController} from '~/controllers/auth'

function authRouter() {
  setupDB()
  let router = new Router()
  let usersRepository = sequelize.getRepository(User)
  let controller = new AuthController(usersRepository)

  router.post('/Login', controller.login.bind(controller))
  router.post('/Register', controller.register.bind(controller))
  return router
}

export {authRouter}
