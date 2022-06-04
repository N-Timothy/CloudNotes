import {registerDecorator} from 'class-validator'

import type {
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'

const REQUIRE_PROPERTIES = 'requireProperties'

function RequireProperties(
  properties: string | string[],
  validationOptions?: ValidationOptions,
) {
  let propertiesArray: string[] = []
  if (Array.isArray(properties)) {
    propertiesArray = properties
  } else {
    propertiesArray = [properties]
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: REQUIRE_PROPERTIES,
      target: object.constructor,
      propertyName: propertyName,
      constraints: propertiesArray,
      options: validationOptions,
      validator: {
        validate<T>(value: T, args: ValidationArguments) {
          let object = args.object as unknown as T
          let required = args.constraints as string[]

          for (let req of required) {
            // @ts-expect-error "string" cannot be used as key
            if (object[req] === undefined) {
              return false
            }
          }

          return true
        },
        defaultMessage(args: ValidationArguments) {
          return `${propertyName} cannot be used without [${args.constraints.join(
            ', ',
          )}]`
        },
      },
    })
  }
}

export {REQUIRE_PROPERTIES, RequireProperties}
