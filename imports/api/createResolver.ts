import { db } from 'meteor/cultofcoders:grapher'

type DB = {
  [field: string]: any
}
export default ({ db: name, Query }: { db: string, Query: ({ db }: { db: DB })=> any }): any => (
  Query({ db: db[name] })
)
