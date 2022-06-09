import Router from '@koa/router'

import {User} from '~/models/User'

import type {ApiRouterParams} from '~/types'

import {AuthController} from '~/controllers/auth'

const AUTH_PATH = '/auth'

function authRouter({database}: ApiRouterParams) {
  let router = new Router({prefix: AUTH_PATH})
  let usersRepository = database.getRepository(User)
  let controller = new AuthController(usersRepository)

  router.post('/login', controller.login.bind(controller))
  router.post('/register', controller.register.bind(controller))
  return router
}

export {authRouter}
