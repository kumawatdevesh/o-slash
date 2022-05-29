import * as dotenv from 'dotenv'
import knexConfigs from './knexfile';
dotenv.config({path: '../.env'})

const environment: string = 'development' || 'development'
const knex = require('knex')(knexConfigs[environment])

export {
    knex
}