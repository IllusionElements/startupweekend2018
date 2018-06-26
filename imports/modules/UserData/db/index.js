import schema from './schema'
import { Mongo } from 'meteor/mongo'
const user = new Mongo.Collection('user')
// console.log(Meteor.user)
user.attachSchema(schema)

export default user
