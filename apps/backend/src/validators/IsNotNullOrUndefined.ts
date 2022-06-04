// Adopted from: https://github.com/typestack/class-validator/blob/develop/src/decorator/common/IsNotEmpty.ts
import {buildMessage, ValidateBy} from 'class-validator'

import type {ValidationOptions} from 'class-validator'

const IS_NOT_NULL_OR_UNDEFINED = 'isNotNullOrUndefined'

/**
 * Checks if given value is not empty (!== null, !== undefined).
 */
function isNotNullOrUndefined(value: unknown): boolean {
  return value !== null && value !== undefined
}

/**
 * Checks if given value is not empty (!== null, !== undefined).
 */
function IsNotNullOrUndefined(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_NOT_NULL_OR_UNDEFINED,
      validator: {
        validate: (value): boolean => isNotNullOrUndefined(value),
        defaultMessage: buildMessage(
          eachPrefix =>
            eachPrefix + '$property should not be null or undefined',
          validationOptions,
        ),
      },
    },
    validationOptions,
  )
}

export {
  IS_NOT_NULL_OR_UNDEFINED,
  isNotNullOrUndefined,
  IsNotNullOrUndefined,
}
