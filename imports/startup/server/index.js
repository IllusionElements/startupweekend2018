import Meteor from 'meteor/meteor'
import Careers from '../../fixtures/jobNameFixtures'
import Keywords from '../../fixtures/keywordFixtures'
import { Career, Keyword } from '../../db'


Meteor.startup(() => {
  JSON.parse(Careers).forEach((career) => {
    Career.insert(career, (err) => {
      if (err) {
        throw new Meteor.Error(err)
      }
    })
  })

  Keywords.forEach((keyword) => {
    Keyword.insert(keyword, (err) => {
      if (err) {
        console.error(err)
        throw new Meteor.Error(err)
      }
    })
  })
})
