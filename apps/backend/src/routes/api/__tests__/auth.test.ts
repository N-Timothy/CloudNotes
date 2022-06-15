import {StatusCodes} from 'http-status-codes'
import supertest from 'supertest'

import {setupMigration} from '~/utils/test-utils'

import app from '~/routes/api/index'
import {setupDatabase} from '~/database'

describe('API auth', () => {
  let request: supertest.SuperTest<supertest.Test>
  let database = setupDatabase()
  let migration = setupMigration(database)

  beforeAll(async () => {
    await migration.down()
    await migration.up()
    request = supertest(app({database}).callback())
  })

  afterAll(async () => {
    await migration.down()
    await database.close()
  })

  describe('success cases', () => {
    test('POST /register (post new user)', async () => {
      let response = await request.post('/auth/register').send({
        name: 'test',
        email: 'test@test.com',
        password: 'test123',
        password_confirmation: 'test123',
      })
      expect(response.status).toBe(StatusCodes.CREATED)
      expect(response.body).toBeDefined()
    })
    test('POST /login (post a user to login)', async () => {
      let response = await request.post('/auth/login').send({
        email: 'test@test.com',
        password: 'test123',
      })
      expect(response.status).toBe(StatusCodes.OK)
      expect(response.body).toBeDefined()
    })
  })

  describe('failed cases', () => {
    test('POST /register (post new user)', async () => {
      let response = await request.post('/auth/register').send({
        name: 'test',
        email: 'test@test.com',
        password: 'test123',
        password_confirmation: 'test123',
      })
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      expect(response.body).toBeDefined()
    })
    test('POST /login (post a user to login)', async () => {
      let response = await request.post('/auth/login').send({
        email: 'test2@test.com',
        password: 'test123',
      })
      expect(response.status).toBe(StatusCodes.NOT_FOUND)
      expect(response.body).toBeDefined()
    })
  })
})
