import Router from '@koa/router'

import {User} from '~/models/User'

import {sequelize, setupDB} from '~/db'
import {AuthController} from '~/controllers/auth'

const AUTH_PATH = '/auth'

function authRouter() {
  setupDB()
  let router = new Router({prefix: AUTH_PATH})
  let usersRepository = sequelize.getRepository(User)
  let controller = new AuthController(usersRepository)

  router.post('/login', controller.login.bind(controller))
  router.post('/register', controller.register.bind(controller))
  return router
}

export {authRouter}
