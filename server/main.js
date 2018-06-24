import { Meteor } from 'meteor/meteor'
import '/imports/db/main'
import '/imports/startup/server'

Meteor.startup(() => {
  process.env.MONGO_URL = Meteor.settings.private.mongo.url.MONGO_URL
})
