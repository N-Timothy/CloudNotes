/// <reference types="node" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'

      PORT?: number

      // database
      DB_HOST?: string
      DB_PORT?: number
      DB_USER?: string
      DB_PASS?: string
      DB_NAME?: string
    }
  }
}

export {}
