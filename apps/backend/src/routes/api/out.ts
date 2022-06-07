import Router from '@koa/router'

import {User} from '~/models/User'

import {sequelize} from '~/db'
import {OutController} from '~/controllers/out'

function setup() {
  let router = new Router()
  let usersRepository = sequelize.getRepository(User)
  let controller = new OutController(usersRepository)

  router.post('/Login', controller.login.bind(controller))
  router.post('/Register', controller.register.bind(controller))
  return router
}

const outRouter = setup()

export {outRouter}
