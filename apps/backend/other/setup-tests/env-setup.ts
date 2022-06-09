import path from 'path'

import dotenv from 'dotenv'

console.log(`============ env-setup Loaded ===========`)
dotenv.config({
  path: path.resolve(process.cwd(), '.env.test'),
})
