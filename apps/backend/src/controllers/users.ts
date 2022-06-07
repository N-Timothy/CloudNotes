import {z} from 'zod'
import {getReasonPhrase, StatusCodes} from 'http-status-codes'

import type {User} from '~/models/User'
import {UserValidation} from '~/models/User'

import {errorResponse, successResponse} from '~/utils/response'

import type {Context} from 'koa'
import type {Repository} from 'sequelize-typescript'

import {ResourceExist} from '~/exceptions/resource-exist'

function refinePasswordConfirmationValidation(
  schema: typeof UserValidation.rulesSchema,
) {
  return schema.refine(
    data => data.password === data.password_confirmation,
    {
      message: "Passwords don't match",
      path: ['password_confirmation'],
    },
  )
}

class UserController {
  public constructor(private usersRepository: Repository<User>) {}

  public async getAll(ctx: Context) {
    let users = await this.usersRepository.findAll()
    ctx.body = users
  }

  public async create(context: Context) {
    try {
      await refinePasswordConfirmationValidation(
        UserValidation.rulesSchema,
      ).parseAsync(context.request.body)

      let [data, created] = await this.usersRepository.findOrCreate({
        where: {email: context.request.body.email},
        defaults: context.request.body,
      })

      if (!created) {
        throw new ResourceExist('Email has already been taken')
      }

      return successResponse(
        context,
        {
          data,
        },
        StatusCodes.CREATED,
      )
    } catch (e) {
      if (e instanceof z.ZodError) {
        return errorResponse(
          context,
          {
            error: e,
          },
          StatusCodes.BAD_REQUEST,
        )
      }

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

  public async update(ctx: Context) {
    try {
      await this.usersRepository.update(ctx.request.body, {
        where: {id: ctx.params.id},
        individualHooks: true,
      })
      ctx.body = 'OK'
    } catch (e) {
      ctx.body = 'ERROR'
    }
  }

  public async delete(ctx: Context) {
    try {
      await this.usersRepository.destroy({where: {id: ctx.params.id}})
      ctx.body = 'OK'
    } catch (e) {
      ctx.body = 'ERROR'
    }
  }
}

export {UserController}
