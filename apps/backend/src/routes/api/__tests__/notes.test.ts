import {StatusCodes} from 'http-status-codes'
import supertest from 'supertest'

import {setupMigration} from '~/utils/test-utils'

import app from '~/routes/api/index'
import {setupDatabase} from '~/database'

describe('API notes', () => {
  let request: supertest.SuperTest<supertest.Test>
  let database = setupDatabase()
  let migration = setupMigration(database)

  let noteId = ''
  let noteId2 = ''
  let failNoteId = 'failed-id'
  let token: string
  let token2: string

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

      response = await request.post('/auth/login').send({
        email: 'test@test.com',
        password: 'test123',
      })

      token = response.body.data.token
    })
    test('GET /notes (get all notes)', async () => {
      let response = await request
        .get('/notes')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(StatusCodes.OK)
      expect(response.body).toBeDefined()
    })

    test('POST /notes (post new notes)', async () => {
      let response = await request
        .post('/notes')
        .send({
          title: 'test',
          content: 'test content',
        })
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(StatusCodes.CREATED)
      expect(response.body).toBeDefined()
      noteId = response.body.data.id
    })
    test('GET /notes/:id (get single note)', async () => {
      let response = await request
        .get(`/notes/${noteId}`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(StatusCodes.OK)
      expect(response.body).toBeDefined()
    })
    test('PUT /notes/:id (update note)', async () => {
      let response = await request
        .put(`/notes/${noteId}`)
        .send({
          title: 'test',
          content: 'test content',
        })
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(StatusCodes.OK)
      expect(response.body).toBeDefined()
    })
    test('DELETE /notes/:id (delete note)', async () => {
      let response = await request
        .delete(`/notes/${noteId}`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(StatusCodes.OK)
      expect(response.body).toBeDefined()
    })
  })

  describe('failed cases', () => {
    beforeAll(async () => {
      let response2 = await request.post('/auth/register').send({
        name: 'test',
        email: 'test2@test.com',
        password: 'test123',
        password_confirmation: 'test123',
      })

      response2 = await request.post('/auth/login').send({
        email: 'test2@test.com',
        password: 'test123',
      })

      token2 = response2.body.data.token

      let response = await request
        .post('/notes')
        .send({
          title: 'test',
          content: 'test content',
        })
        .set('Authorization', `Bearer ${token}`)

      noteId2 = response.body.data.id
    })

    test('GET /notes (get notes)', async () => {
      let response = await request.get('/notes')
      expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
      expect(response.body).toBeDefined()
    })

    test('POST /notes (post new notes)', async () => {
      let response = await request.post('/notes').send({
        title: 'test',
        content: 'test content',
      })
      expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
      expect(response.body).toBeDefined()
    })

    test('POST /notes (post new notes)', async () => {
      let response = await request
        .post('/notes')
        .send({
          title: 'test',
        })
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      expect(response.body).toBeDefined()
    })
    test('GET /notes/:id (get single note)', async () => {
      let response = await request
        .get(`/notes/${noteId2}`)
        .set('Authorization', `Bearer ${token2}`)
      expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
      expect(response.body).toBeDefined()
    })
    test('PUT /notes/:id (update note)', async () => {
      let response = await request
        .put(`/notes/${failNoteId}`)
        .send({
          title: 'test',
          content: 'test content',
        })
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      expect(response.body).toBeDefined()
    })
    test('PUT /notes/:id (update note)', async () => {
      let response = await request
        .put(`/notes/${noteId2}`)
        .send({
          title: 'test',
          content: 'test content',
        })
        .set('Authorization', `Bearer ${token2}`)
      expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
      expect(response.body).toBeDefined()
    })
    test('DELETE /notes/:id (delete note)', async () => {
      let response = await request
        .delete(`/notes/${failNoteId}`)
        .send({
          title: 'test',
          content: 'test content',
        })
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      expect(response.body).toBeDefined()
    })
    test('DELETE /notes/:id (delete note)', async () => {
      let response = await request
        .delete(`/notes/${noteId2}`)
        .send({
          title: 'test',
          content: 'test content',
        })
        .set('Authorization', `Bearer ${token2}`)
      expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
      expect(response.body).toBeDefined()
    })
  })
})
