import {env} from 'process'

import {z} from 'zod'
import {getReasonPhrase, StatusCodes} from 'http-status-codes'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

import type {User} from '~/models/User'
import {UserValidation} from '~/models/User'
import {refinePasswordConfirmationValidation} from '~/models/User'

import {errorResponse, successResponse} from '~/utils/response'

import type {Context} from 'koa'
import type {Repository} from 'sequelize-typescript'

import {ResourceExistError} from '~/errors/resource-exist'
import {ResourceNotExistError} from '~/errors/resource-not-exist'
import {PasswordNotMatch} from '~/errors/password-not-match'

class AuthController {
  public constructor(private usersRepository: Repository<User>) {}

  public async login(context: Context) {
    try {
      let data = await this.usersRepository.findOne({
        where: {email: context.request.body.email},
      })

      if (data === null) {
        throw new ResourceNotExistError('User does not exist')
      }

      let passwordMatch = await argon2.verify(
        data.password,
        context.request.body.password,
      )

      if (!passwordMatch) {
        throw new PasswordNotMatch('Password does not match')
      }

      return successResponse(
        context,
        {
          data: {
            token: jwt.sign(
              {
                data: data.id,
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
              },
              `${env.JWT_SECRET}`,
            ),
          },
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
      if (e instanceof PasswordNotMatch) {
        return errorResponse(
          context,
          {
            error: e,
          },
          StatusCodes.BAD_REQUEST,
        )
      }
    }
  }

  public async register(context: Context) {
    try {
      await refinePasswordConfirmationValidation(
        UserValidation.rulesSchema,
      ).parseAsync(context.request.body)

      let [data, created] = await this.usersRepository.findOrCreate({
        where: {email: context.request.body.email},
        defaults: context.request.body,
      })
      if (!created) {
        throw new ResourceExistError('Email has already been taken')
      }

      return successResponse(
        context,
        {
          data: data.serialize(),
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
}

export {AuthController}
