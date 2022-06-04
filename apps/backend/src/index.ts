import 'reflect-metadata'

import express from 'express'

import type {Express, Request, Response} from 'express'

import dataSource from './db'
import {User} from './models/User'

const app: Express = express()
const port = process.env.PORT || 3000

dataSource
  .initialize()
  .then(() => {
    app.get('/', async (req: Request, res: Response) => {
      let users = await dataSource.getRepository(User).find()
      res.send(users)
    })

    app.listen(port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${port}`,
      )
    })
  })
  .catch(error => console.log(error))
