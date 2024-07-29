import { Database } from 'packages/backend/src/db/model'
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { config } from 'packages/backend/src/loaders/config'

const dialect = new PostgresDialect({
  pool: new Pool({
    database: config.database.database,
    user:  config.database.user,
    password: config.database.password,
    host: config.database.host,
    port: config.database.port,
    max: config.database.max,
  })
})

const db = new Kysely<Database>({
  dialect,
})

export default db;