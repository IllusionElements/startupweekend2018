import { Meteor } from 'meteor/meteor'
import '/imports/db/main'
import '/imports/startup/server'
import { CareerQuery } from '/imports/modules/query'
import { Keyword as Keywords } from '/imports/db'
import User from '/imports/modules/UserData/db'

Meteor.methods({
  getQuery({ name }) {
    switch (name) {
      case 'career': {
        return CareerQuery.clone().fetch()
      }
      case 'keyword': {
        return Keywords._collection.find({}).fetch()
      }
      default: {
        return User.createQuery({
          name: 1,
        }).clone().fetch()
      }
    }
  },
  db({ collection, data, method }) {
    return Array.isArray(data) ? data.map(d => collection[method](d)) : collection[method](data)
  },
  'post query': function postQuery({ ...data }) {
    User.insert({ data })

    return true
  },
})
