import {Knex} from 'knex';

interface IKnexConfig {
    [key: string]: Knex.Config;
}

export {
    IKnexConfig
}