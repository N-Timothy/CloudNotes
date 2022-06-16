import Router from '@koa/router'

import {Note} from '~/models/Note'

import type {ApiRouterParams} from '~/types'

import {NoteController} from '~/controllers/notes'

const NOTES_PATH = '/notes'

function notesRouter({database}: ApiRouterParams) {
  let router = new Router({prefix: NOTES_PATH})
  let notesRepository = database.getRepository(Note)
  let controller = new NoteController(notesRepository)

  router.get('/', controller.getAll.bind(controller))
  router.post('/', controller.create.bind(controller))
  router.get('/:id', controller.getOne.bind(controller))
  router.put('/:id', controller.update.bind(controller))
  router.delete('/:id', controller.delete.bind(controller))
  return router
}

export {notesRouter}
