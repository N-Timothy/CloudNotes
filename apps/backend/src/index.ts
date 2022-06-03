import express from 'express'

import type {Express, Request, Response} from 'express'

import {setupDB} from './db'

const app: Express = express()
const port = process.env.PORT || 3000

setupDB()
  .initialize()
  .then(() => {
    app.get('/', (req: Request, res: Response) => {
      res.send('Express + TypeScript Server')
    })

    app.listen(port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${port}`,
      )
    })
  })
  .catch(error => console.log(error))
