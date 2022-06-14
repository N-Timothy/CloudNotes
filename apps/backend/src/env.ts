import {z} from 'zod'

class Environment {
  private validation: ReturnType<typeof Environment.schema.parseAsync>

  constructor() {
    this.validation = Environment.schema.parseAsync(this)
  }

  public validate() {
    return this.validation
  }

  private static get schema() {
    return z.object({
      ENVIRONMENT: z.enum(['development', 'production', 'test']),
      HOST: z.string().min(1),
      PORT: z.number(),
      HTTPS: z.boolean(),
      DOMAIN: z.string().url(),
      DATABASE_URL: z.string().url(),
      JWT_SECRET: z.string(),
    })
  }

  /**
   * The current envionment name.
   */

  public ENVIRONMENT = process.env.NODE_ENV ?? 'production'

  /**
   * Server hostname
   */
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
  public DOMAIN = `${this.HTTPS ? 'https' : 'http'}://${this.HOST}:${
    this.PORT
  }`

  /**
   * Database URL
   */
  public DATABASE_URL = process.env.DATABASE_URL as string

  /**
   * Json Web Token Secret
   */

  public JWT_SECRET = process.env.JWT_SECRET ?? 'jwt-secret'

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
