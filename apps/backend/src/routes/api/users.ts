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
      // check if user exist then create
      const [data, created] = await userRepository.findOrCreate({
        where: {email: ctx.request.body.email},
        defaults: ctx.request.body,
      })

      if (!created) {
        throw 'email_exist'
      }

      ctx.body = 'OK'
    } catch (e) {
      ctx.body = e === 'email_exist' ? 'EMAIL EXIST' : 'ERROR'
    }
  })

  // update user
  router.put('/', async ctx => {
    try {
      await userRepository.update(ctx.request.body, {
        where: {email: ctx.request.body.email},
        individualHooks: true,
      })
      ctx.body = 'OK'
    } catch (e) {
      ctx.body = 'ERROR'
    }
  })

  // delete user

  router.delete('/:id', async ctx => {
    try {
      await userRepository.destroy({where: {id: ctx.params.id}})
      ctx.body = 'OK'
    } catch (e) {
      ctx.body = 'ERROR'
    }
  })

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
