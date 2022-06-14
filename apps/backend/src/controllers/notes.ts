import {z} from 'zod'
import {getReasonPhrase, StatusCodes} from 'http-status-codes'
import jwt from 'jsonwebtoken'

import type {Note} from '~/models/Note'
import {NoteValidation} from '~/models/Note'

import {errorResponse, successResponse} from '~/utils/response'

import type {JwtPayload} from 'jsonwebtoken'
import type {Context} from 'koa'
import type {Repository} from 'sequelize-typescript'

import {ResourceNotExistError} from '~/errors/resource-not-exist'
import {UnauthorizedChange} from '~/errors/unauthorized-change'

async function getActiveUser(context: Context) {
  let tokens = `${context.request.header.authorization}`
  let token = tokens.split(' ')
  if (token[0] != 'Bearer') {
    throw new Error('Token is not valid')
  }
  let auth: JwtPayload = jwt.decode(`${token[1]}`)
  return auth?.data
}
class NoteController {
  public constructor(private notesRepository: Repository<Note>) {}

  public async getAll(context: Context) {
    try {
      let user_id = await getActiveUser(context)

      let notes = await this.notesRepository.findAll({
        where: {user_id},
      })
      return successResponse(
        context,
        {
          data: notes,
        },
        StatusCodes.OK,
      )
    } catch (e) {
      if (e instanceof Error) {
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

  public async create(context: Context) {
    try {
      let user_id = await getActiveUser(context)

      context.request.body['user_id'] = user_id

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
      let user_id = await getActiveUser(context)

      let notes = await this.notesRepository.findOne({
        where: {id: context.params.id},
      })

      if (notes?.user_id == null) {
        throw new ResourceNotExistError('Note does not exist')
      }

      if (notes?.user_id != user_id) {
        throw new UnauthorizedChange('Unauthorized change')
      }

      context.request.body['user_id'] = user_id

      NoteValidation.rulesSchema.parseAsync(context.request.body)

      let [, data] = await this.notesRepository.update(
        context.request.body,
        {
          where: {id: context.params.id},
          returning: true,
        },
      )

      return successResponse(
        context,
        {
          data: data[0],
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
      if (e instanceof UnauthorizedChange) {
        return errorResponse(
          context,
          {
            error: e,
          },
          StatusCodes.UNAUTHORIZED,
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
      let user_id = await getActiveUser(context)

      let notes = await this.notesRepository.findOne({
        where: {id: context.params.id},
      })

      if (notes?.user_id == null) {
        throw new ResourceNotExistError('Note does not exist')
      }

      if (notes?.user_id != user_id) {
        throw new UnauthorizedChange('Unauthorized change')
      }

      let affectedCount = await this.notesRepository.destroy({
        where: {id: context.params.id},
      })

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
      if (e instanceof UnauthorizedChange) {
        return errorResponse(
          context,
          {
            error: e,
          },
          StatusCodes.UNAUTHORIZED,
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
