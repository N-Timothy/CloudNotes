import supertest from 'supertest'

import app from '~/routes/api/index'
import {sequelize} from '~/db'

describe('API users', () => {
  let request: supertest.SuperTest<supertest.Test>

  beforeAll(async () => {
    // await sequelize.drop()
    // await sequelize.sync({ force: true })
    request = supertest(app.callback())
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('GET /users (get all users)', async () => {
    let response = await request.get('/users')
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
  })
})
