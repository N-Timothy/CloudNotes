module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'cloudnotes',
  synchronize: false,
  logging: true,
  entities: ['src/models/**/*.ts'],
  migrations: ['migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'migration',
    subscribersDir: 'src/subscriber',
  },
}
