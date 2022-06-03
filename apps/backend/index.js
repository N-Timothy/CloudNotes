/* eslint-disable @typescript-eslint/no-var-requires */
require('reflect-metadata')
require('dotenv').config()
if (process.env.NODE_ENV === 'production') {
  require('./dist')
} else {
  require('esbuild-register/dist/node').register()
  require('./src')
}
