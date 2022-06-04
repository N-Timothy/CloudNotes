import {DataSource} from 'typeorm'

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'cloudnotes',
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: [`${__dirname}/models/**/*.{js,ts}`],
  migrations: ['migrations/**/*.ts'],
  subscribers: [`${__dirname}subscribers/**/*.{js,ts}`],
})

export default dataSource
