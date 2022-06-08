import {z} from 'zod'
import {StatusCodes} from 'http-status-codes'

import type {Context} from 'koa'

// eslint-disable-next-line @typescript-eslint/ban-types
type Meta = {}

type Response<T extends object = object> =
  | {
      data: T
      errors: []
      meta: Meta
    }
  | {
      data: null
      errors: {
        message: string
      }[]
      meta: Meta
    }

interface SuccessResponseParams<
  T extends object = object,
  M extends Meta = object,
> {
  data: T
  meta?: M
}

function successResponse<
  T extends object = object,
  M extends Meta = object,
>(
  context: Context,
  params: SuccessResponseParams<T, M>,
  httpStatus: StatusCodes = StatusCodes.OK,
): Response<T> {
  let {data, meta} = params
  let body: Response<T> = {
    data,
    errors: [],
    meta: meta ?? {},
  }
  context.status = httpStatus
  context.body = body

  return body
}

function checkIfErrorIsString(
  err: Error | z.ZodError | string,
): err is string {
  return !(err instanceof z.ZodError || err instanceof Error)
}

function checkIfErrorIsZodError(
  err: Error | z.ZodError,
): err is z.ZodError {
  return err instanceof z.ZodError
}

interface ErrorResponseParams {
  error: Error | z.ZodError | string
}

function errorResponse(
  context: Context,
  params: ErrorResponseParams,
  httpStatus: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
) {
  let {error} = params

  let body: Response
  if (checkIfErrorIsString(error)) {
    body = {
      data: null,
      errors: [{message: error}],
      meta: {},
    }
  } else if (checkIfErrorIsZodError(error)) {
    body = {
      data: null,
      errors: error.issues.map(({message}) => ({message})),
      meta: {},
    }
  } else {
    body = {
      data: null,
      errors: [{message: error.message}],
      meta: {},
    }
  }

  context.throw(httpStatus, body)
}

export {successResponse, errorResponse}

export type {Meta, Response}
