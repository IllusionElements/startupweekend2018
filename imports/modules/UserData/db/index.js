import Mongo from 'meteor/mongo'
import schema from './schema'

const UserData = new Mongo.Collection('userdata')

UserData.attachSchema(schema)

export default UserData
