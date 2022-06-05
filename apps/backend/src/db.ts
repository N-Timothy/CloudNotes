import {Sequelize} from 'sequelize-typescript'

import {env} from './env'

const sequelize = new Sequelize(env.DATABASE_URL, {
  repositoryMode: true,
  models: [__dirname + '/models/**/*.ts'],
  // logging: console.log,
  //   modelMatch: (filename, member) => {
  //     return (
  //       filename.substring(0, filename.indexOf('.model')) ===
  //       member.toLowerCase()
  //     )
  //   },
})

export {sequelize}
