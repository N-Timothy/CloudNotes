import 'reflect-metadata'

import express from 'express'

import type {Express, Request, Response} from 'express'

import dataSource from './db'
import {User} from './models/User'
import {env} from './env'

const app: Express = express()

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
  await dataSource.initialize()

  app.get('/', async (req: Request, res: Response) => {
    let users = await dataSource.getRepository(User).find()
    res.send(users)
  })

  app.listen(env.PORT, env.HOST, () => {
    console.log(`⚡️[server]: Server is running at ${env.DOMAIN}`)
  })
}

start()
