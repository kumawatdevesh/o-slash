import * as dotenv from 'dotenv'
import { Knex } from 'knex';
import knexConfigs from './knexfile';
dotenv.config({path: '../.env'})

const environment: string = 'development' || 'development'
const knex: Knex = require('knex')(knexConfigs[environment])

export {
    knex
}