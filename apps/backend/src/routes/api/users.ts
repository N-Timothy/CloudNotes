import Router from '@koa/router'

import {User} from '~/models/User'

import type {ApiRouterParams} from '~/types'

import {UserController} from '~/controllers/users'

const USERS_PATH = '/users'

function usersRouter({database}: ApiRouterParams) {
  let router = new Router({prefix: USERS_PATH})
  let usersRepository = database.getRepository(User)
  let controller = new UserController(usersRepository)

  router.get('/', controller.getAll.bind(controller))
  router.post('/', controller.create.bind(controller))
  router.put('/:id', controller.update.bind(controller))
  router.delete('/:id', controller.delete.bind(controller))
  return router
}

export {usersRouter}
