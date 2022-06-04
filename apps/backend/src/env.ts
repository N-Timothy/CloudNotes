import {
  validate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsUrl,
} from 'class-validator'

import type {ValidationError} from 'class-validator'

import {IsNotNullOrUndefined, RequireProperties} from '~/validators'

class Environment {
  private validation: Promise<ValidationError[]>

  constructor() {
    this.validation = validate(this)
  }

  public validate() {
    return this.validation
  }

  /**
   * The current envionment name.
   */
  @IsIn(['development', 'production', 'test'])
  public ENVIRONMENT = process.env.NODE_ENV ?? 'production'

  /**
   * Server hostname
   */
  @IsNotEmpty()
  public HOST = process.env.HOST ?? 'localhost'

  /**
   * The port to listen to
   */
  public PORT = this.toNumber(`${process.env.PORT}`, 3000)

  /**
   * HTTP / HTTPS
   */
  public HTTPS = this.toBoolean(process.env.HTTPS, false)

  /**
   * Domain
   */
  @IsUrl({
    require_tld: process.env.NODE_ENV === 'production',
    protocols: ['http', 'https'],
    require_protocol: true,
  })
  public DOMAIN = `${this.HTTPS ? 'https' : 'http'}://${this.HOST}:${
    this.PORT
  }`

  /**
   * Database hostname
   */
  @IsNotEmpty()
  @RequireProperties(['DB_PORT', 'DB_USER', 'DB_PASS', 'DB_NAME'])
  public DB_HOST = process.env.DB_HOST as string

  /**
   * Database port
   */
  @IsNotEmpty()
  @IsNumber()
  @RequireProperties(['DB_HOST', 'DB_USER', 'DB_PASS', 'DB_NAME'])
  public DB_PORT = this.toNumber(process.env.DB_PORT, 5432)

  /**
   * Database username
   */
  @IsNotEmpty()
  @RequireProperties(['DB_HOST', 'DB_PORT', 'DB_PASS', 'DB_NAME'])
  public DB_USER = process.env.DB_USER as string

  /**
   * Database password
   */
  @IsNotNullOrUndefined()
  @RequireProperties(['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_NAME'])
  public DB_PASS = process.env.DB_PASS as string

  /**
   * Database name
   */
  @IsNotEmpty()
  @RequireProperties(['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASS'])
  public DB_NAME = process.env.DB_NAME as string

  private toNumber(value: string | undefined, def: number) {
    let val = value ? parseInt(value, 10) : def

    if (isNaN(val)) {
      return def
    }

    return val
  }

  private toBoolean(value: string | undefined, def: boolean) {
    if (value === undefined) {
      return def
    }

    return value === 'true'
  }
}

const env = new Environment()

export {Environment, env}
