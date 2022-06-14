import {z} from 'zod'
import {getReasonPhrase, StatusCodes} from 'http-status-codes'
import jwt from 'jsonwebtoken'

import type {User} from '~/models/User'
import {refinePasswordConfirmationValidation} from '~/models/User'
import {UserValidation} from '~/models/User'

import {errorResponse, successResponse} from '~/utils/response'

import type {JwtPayload} from 'jsonwebtoken'
import type {Context} from 'koa'
import type {Repository} from 'sequelize-typescript'

import {ResourceExistError} from '~/errors/resource-exist'
import {ResourceNotExistError} from '~/errors/resource-not-exist'
import {UnauthorizedChange} from '~/errors/unauthorized-change'

async function validateJsonWebToken(context: Context) {
  let tokens = `${context.request.header.authorization}`
  let token = tokens.split(' ')
  if (token[0] != 'Bearer') {
    throw new Error('Token is not valid')
  }

  let auth: JwtPayload = jwt.decode(`${token[1]}`)
  if (context.params.id === auth?.data) {
    return
  }
  throw new UnauthorizedChange('Unauthorized change')
}

class UserController {
  public constructor(private usersRepository: Repository<User>) {}

  public async getAll(context: Context) {
    try {
      let data = await this.usersRepository.findAll({
        attributes: {
          exclude: ['password'],
        },
      })
      return successResponse(
        context,
        {
          data,
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
      await refinePasswordConfirmationValidation(
        UserValidation.rulesSchema,
      ).parseAsync(context.request.body)

      let [data, created] = await this.usersRepository.findOrCreate({
        where: {email: context.request.body.email},
        attributes: {
          exclude: ['password'],
        },
        defaults: context.request.body,
      })

      if (!created) {
        throw new ResourceExistError('Email has already been taken')
      }

      return successResponse(
        context,
        {
          data,
        },
        StatusCodes.CREATED,
      )
    } catch (e) {
      if (
        e instanceof z.ZodError ||
        e instanceof ResourceExistError ||
        e instanceof Error
      ) {
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
      await UserValidation.rulesSchema.parseAsync(
        context.request.body,
      )

      await validateJsonWebToken(context)

      let [affectedCount, data] = await this.usersRepository.update(
        context.request.body,
        {
          where: {id: context.params.id},
          individualHooks: true,
          returning: true,
        },
      )

      if (affectedCount === 0) {
        throw new ResourceNotExistError('User does not exist')
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
      await validateJsonWebToken(context)

      let affectedCount = await this.usersRepository.destroy({
        where: {id: context.params.id},
      })

      if (affectedCount === 0) {
        throw new ResourceNotExistError('User does not exist')
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

export {UserController}
