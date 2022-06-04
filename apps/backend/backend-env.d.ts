/// <reference types="node" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'

      // server
      HOST?: string
      PORT?: string
      HTTPS?: string

      // database
      DB_HOST?: string
      DB_PORT?: string
      DB_USER?: string
      DB_PASS?: string
      DB_NAME?: string
    }
  }
}

export {}
