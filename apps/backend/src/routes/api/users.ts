import Router from '@koa/router'

import {User} from '~/models/User'

import {sequelize} from '~/db'

const USERS_PATH = '/users'

function setup() {
  let router = new Router({prefix: USERS_PATH})

  let userRepository = sequelize.getRepository(User)

  router.get('/', async ctx => {
    let users = await userRepository.findAll()
    ctx.body = users
  })

  router.post('/', async ctx => {
    // validate body
    //   - if not valid, throw errors
    //   - if user already exists, throw error
    //   - if valid, create user

    try {
      // check if user already exists
      await userRepository.create(ctx.request.body)
      ctx.body = 'OK'
    } catch (e) {
      ctx.body = 'ERROR'
    }
  })

  // update user

  // delete user

  // return HTTP status code
  // data (2XX)
  // redirect (3XX)
  // errors (4XX)
  // server errors (5XX)
  // meta {}

  return router
}

const usersRouter = setup()

export {usersRouter}
