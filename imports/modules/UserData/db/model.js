import Model from '../../Model'

export default class UserDataModel extends Model {
  'name' = String

  'name.optional' = true

  'username' = String

  'username.optional' = true

  'password' = String

  'password.optional' = true

  'age' = Number || String

  'age.optional' = true

  'birthday' = Date || String

  'birthday.optional' = true

  'school' = String

  'school.optional' = true

  'major' = String

  'major.optional' = true

  'career '= String

  'career.optional' = true

  'workExperience' = String

  'workExperience.optional' = true

  'projectDescription' = String

  'skills' = [String]

  'skills.optional' = true

  'dateCreated' = {
    type: String || Date,
    autoValue() {
      return { $push: new Date() }
    },
  }

  'dateCreated.optional' = true
}
