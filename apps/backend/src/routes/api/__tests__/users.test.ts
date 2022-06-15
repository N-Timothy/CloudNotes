import supertest from 'supertest'
import {StatusCodes} from 'http-status-codes'

import {setupMigration} from '~/utils/test-utils'

import app from '~/routes/api/index'
import {setupDatabase} from '~/database'

describe('API users', () => {
  let request: supertest.SuperTest<supertest.Test>
  let database = setupDatabase()
  let migration = setupMigration(database)

  let testId = ''
  let failTestId = 'failed-id'
  let token: string

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
    beforeAll(async () => {
      let response = await request.post('/auth/register').send({
        name: 'test',
        email: 'test@test.com',
        password: 'test123',
        password_confirmation: 'test123',
      })

      testId = response.body.data.id

      response = await request.post('/auth/login').send({
        email: 'test@test.com',
        password: 'test123',
      })

      token = response.body.data.token
    })

    test('GET /users (get all users)', async () => {
      let response = await request
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(StatusCodes.OK)
      expect(response.body).toBeDefined()
    })

    test('POST /users (post new user)', async () => {
      let response = await request
        .post('/users')
        .send({
          name: 'test',
          email: 'test1@test.com',
          password: 'test123',
          password_confirmation: 'test123',
        })
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(StatusCodes.CREATED)
      expect(response.body).toBeDefined()
    })

    test('PUT /users/:id (update user)', async () => {
      let response = await request
        .put(`/users/${testId}`)
        .send({
          name: 'test',
          email: 'test@test.com',
          password: 'test123',
          password_confirmation: 'test123',
        })
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(StatusCodes.OK)
      expect(response.body).toBeDefined()
    })

    test('DELETE /users/:id (delete user)', async () => {
      let response = await request
        .delete(`/users/${testId}`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(StatusCodes.OK)
      expect(response.body).toBeDefined()
    })
  })

  describe('failed cases', () => {
    test('POST /users (post new user)', async () => {
      let response = await request
        .post('/users')
        .send({
          name: 'test',
          email: 'test1@test.com',
          password: 'test123',
          password_confirmation: 'test123',
        })
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      expect(response.body).toBeDefined()
    })

    test('PUT /users/:id (update user)', async () => {
      let response = await request
        .put(`/users/${failTestId}`)
        .send({
          name: 'test',
          email: 'test1@test.com',
          password: 'test123',
          password_confirmation: 'test123',
        })
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
      expect(response.body).toBeDefined()
    })

    test('DELETE /users/:id (delete user)', async () => {
      let response = await request
        .delete(`/users/${failTestId}`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      expect(response.body).toBeDefined()
    })
  })
})
