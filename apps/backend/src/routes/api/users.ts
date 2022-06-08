import Router from '@koa/router'

import {User} from '~/models/User'

import {sequelize, setupDB} from '~/db'
import {UserController} from '~/controllers/users'

const USERS_PATH = '/users'

function usersRouter() {
  setupDB()
  let router = new Router({prefix: USERS_PATH})
  let usersRepository = sequelize.getRepository(User)
  let controller = new UserController(usersRepository)

  router.get('/', controller.getAll.bind(controller))
  router.post('/', controller.create.bind(controller))
  router.put('/:id', controller.update.bind(controller))
  router.delete('/:id', controller.delete.bind(controller))
  return router
}

export {usersRouter}
