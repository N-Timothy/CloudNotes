import supertest from 'supertest'
import {StatusCodes} from 'http-status-codes'

import {setupMigration} from '~/utils/test-utils'

import app from '~/routes/api/index'
import {setupDatabase} from '~/database'

describe('API users', () => {
  let request: supertest.SuperTest<supertest.Test>
  let testId = ''
  let failTestId = 'failed-id'
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
    // Test cases are expected to be failed

    test('GET /users (get all users)', async () => {
      let response = await request.get('/users')
      expect(response.status).toBe(StatusCodes.OK)
      expect(response.body).toBeDefined()
    })

    test('POST /users (post new user)', async () => {
      let response = await request.post('/users').send({
        name: 'test',
        email: 'test1@test.com',
        password: 'test123',
        password_confirmation: 'test123',
      })
      expect(response.status).toBe(StatusCodes.CREATED)
      expect(response.body).toBeDefined()
      testId = response.body.data.id
    })

    test('PUT /users/:id (update user)', async () => {
      let response = await request.put(`/users/${testId}`).send({
        name: 'test2',
        email: 'test1@test.com',
        password: 'test123',
        password_confirmation: 'test123',
      })
      expect(response.status).toBe(StatusCodes.OK)
      expect(response.body).toBeDefined()
    })

    test('DELETE /users/:id (delete user)', async () => {
      let response = await request.delete(`/users/${testId}`)
      expect(response.status).toBe(StatusCodes.OK)
      expect(response.body).toBeDefined()
    })
  })

  describe('failed cases', () => {
    // Test cases are expected to be failed

    test('POST /users (post new user)', async () => {
      let response = await request.post('/users').send({
        name: 'test',
        email: 'test1@test.com',
        password: 'test123',
        password_confirmation: 'test123',
      })
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      expect(response.body).toBeDefined()
    })

    test('PUT /users/:id (update user)', async () => {
      let response = await request.put(`/users/${failTestId}`).send({
        name: 'test',
        email: 'test1@test.com',
        password: 'test123',
        password_confirmation: 'test123',
      })
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      expect(response.body).toBeDefined()
    })

    test('DELETE /users/:id (delete user)', async () => {
      let response = await request.delete(`/users/${failTestId}`)
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      expect(response.body).toBeDefined()
    })
  })
})
