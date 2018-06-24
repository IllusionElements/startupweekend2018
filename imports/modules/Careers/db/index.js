import Mongo from 'meteor/mongo'
import schema from './schema'

const Careers = new Mongo.Collection('careers')

Careers.attachSchema(schema)

export default Careers
