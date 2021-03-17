require('dotenv').config()

const options  = {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: ['knex', 'public']
};
module.exports = {
    options
}