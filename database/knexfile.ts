// Update with your config settings.
import * as dotenv from 'dotenv';
import path from 'path';
import { IKnexConfig } from "../interfaces/database";

dotenv.config({path: path.join(__dirname, '../.env')})

const knexConfigs: IKnexConfig = {

  development: {
    client: 'mysql',
    migrations: {
      extension: 'ts'
    },
    connection: {
      host: process.env.DB_HOST,
      user:  process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      charset: 'utf8mb4'
    },
    debug: true
  },
  staging: {
    client: 'mysql',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      charset: 'utf8mb4'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'mysql',
    connection: {
    host: process.env.DB_HOST,    
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: 'utf8mb4'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
  
export default knexConfigs