import {z} from 'zod'
import {getReasonPhrase, StatusCodes} from 'http-status-codes'

import type {Note} from '~/models/Note'
import {NoteValidation} from '~/models/Note'

import {errorResponse, successResponse} from '~/utils/response'

import type {Context} from 'koa'
import type {Repository} from 'sequelize-typescript'

import {ResourceNotExistError} from '~/errors/resource-not-exist'

class NoteController {
  public constructor(private notesRepository: Repository<Note>) {}

  public async getAll(context: Context) {
    try {
      let notes = await this.notesRepository.findAll()
      return successResponse(
        context,
        {
          data: notes,
        },
        StatusCodes.OK,
      )
    } catch (e) {
      return errorResponse(
        context,
        {
          error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        },
        StatusCodes.INTERNAL_SERVER_ERROR,
      )
    }
  }

  public async create(context: Context) {
    try {
      await NoteValidation.rulesSchema.parseAsync(
        context.request.body,
      )

      let data = await this.notesRepository.create(
        context.request.body,
      )

      return successResponse(
        context,
        {
          data,
        },
        StatusCodes.CREATED,
      )
    } catch (e) {
      if (e instanceof z.ZodError || e instanceof Error) {
        return errorResponse(
          context,
          {
            error: e,
          },
          StatusCodes.BAD_REQUEST,
        )
      }

      return errorResponse(
        context,
        {
          error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        },
        StatusCodes.INTERNAL_SERVER_ERROR,
      )
    }
  }

  public async update(context: Context) {
    try {
      NoteValidation.rulesSchema.parseAsync(context.request.body)
      let [affectedCount, data] = await this.notesRepository.update(
        context.request.body,
        {
          where: {id: context.params.id},
          individualHooks: true,
          returning: true,
        },
      )

      if (affectedCount === 0) {
        throw new ResourceNotExistError('Note does not exist')
      }

      return successResponse(
        context,
        {
          data: data[0].serialize(),
        },
        StatusCodes.OK,
      )
    } catch (e) {
      if (e instanceof ResourceNotExistError) {
        return errorResponse(
          context,
          {
            error: e,
          },
          StatusCodes.NOT_FOUND,
        )
      }
      if (e instanceof z.ZodError || e instanceof Error) {
        return errorResponse(
          context,
          {
            error: e,
          },
          StatusCodes.BAD_REQUEST,
        )
      }
      return errorResponse(
        context,
        {
          error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        },
        StatusCodes.INTERNAL_SERVER_ERROR,
      )
    }
  }

  public async delete(context: Context) {
    try {
      let affectedCount = await this.notesRepository.destroy({
        where: {id: context.params.id},
      })

      if (affectedCount === 0) {
        throw new ResourceNotExistError('Note does not exist')
      }

      return successResponse(
        context,
        {
          data: {affectedCount},
        },
        StatusCodes.OK,
      )
    } catch (e) {
      if (e instanceof ResourceNotExistError) {
        return errorResponse(
          context,
          {
            error: e,
          },
          StatusCodes.NOT_FOUND,
        )
      }
      if (e instanceof z.ZodError || e instanceof Error) {
        return errorResponse(
          context,
          {
            error: e,
          },
          StatusCodes.BAD_REQUEST,
        )
      }
      return errorResponse(
        context,
        {
          error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        },
        StatusCodes.INTERNAL_SERVER_ERROR,
      )
    }
  }
}

export {NoteController}
