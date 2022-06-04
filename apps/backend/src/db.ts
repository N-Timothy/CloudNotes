import {DataSource} from 'typeorm'

import {env} from '~/env'

const dataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: false,
  logging: env.ENVIRONMENT === 'development',
  entities: [`${__dirname}/models/**/*.{js,ts}`],
  migrations: ['migrations/**/*.ts'],
  subscribers: [`${__dirname}subscribers/**/*.{js,ts}`],
})

export default dataSource
