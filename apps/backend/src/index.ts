import 'reflect-metadata'

import Koa from 'koa'
import Router from '@koa/router'
import mount from 'koa-mount'

import routesApi from './routes/api'
import {env} from './env'

const app = new Koa()

const router = new Router()

async function checkEnv() {
  await env.validate().then(errors => {
    if (errors.length > 0) {
      console.warn('\nPassed environment variables are wrong:')
      for (let error of errors) {
        console.warn(
          `- ${Object.values(error.constraints ?? {}).join(', ')}`,
        )
      }
      console.log('\n')
      process.exit(1)
    }
  })
}

async function start() {
  await checkEnv()

  router.get('/', async ctx => {
    ctx.body = "Whatchu doin' here"
  })

  app.use(router.routes()).use(router.allowedMethods())
  app.use(mount('/api', routesApi))

  app.listen(env.PORT, env.HOST, () => {
    console.log(`⚡️[server]: Server is running at ${env.DOMAIN}`)
  })
}

start()
