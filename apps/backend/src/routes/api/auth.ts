import Router from '@koa/router'

import {User} from '~/models/User'

import type {ApiRouterParams} from '~/types'

import {AuthController} from '~/controllers/auth'

function authRouter({database}: ApiRouterParams) {
  let router = new Router()
  let usersRepository = database.getRepository(User)
  let controller = new AuthController(usersRepository)

  router.post('/Login', controller.login.bind(controller))
  router.post('/Register', controller.register.bind(controller))
  return router
}

export {authRouter}
