import UserDataModel from './model'
import User from '.'
import { Schema } from '../../Model'

export default new Schema(null, User, (SchemaBuilder) => {
  const schema = SchemaBuilder.registerSchema(UserDataModel)
  const collection = SchemaBuilder.setSchema(User)
  SchemaBuilder.setSchema(Meteor.Users)
  return {
    schema,
    collection,
  }
})
