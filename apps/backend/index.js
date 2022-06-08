/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
if (process.env.NODE_ENV === 'production') {
  process.chdir('./dist')
  require('./dist')
} else {
  require('@swc-node/register')
  require('./src')
}
