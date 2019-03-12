const argv = require('yargs')

export const MONGODB = {
    uri: `mongodb:127.0.0.1:${ argv.dbport || '27017' }/vuemall`,
    username: argv.db_username || 'DB_username',
    password: argv.db_password || 'DB_password',
}
export const AUTH = {
    data: argv.auth_data || { user: 'root' },
    jwtToken: argv.auth_key || 'blog-node',
    defaultPassword: argv.auth_default_password || 'root'
}