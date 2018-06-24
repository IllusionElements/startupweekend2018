import Model from '../../Model'

export default class UserDataModel extends Model {
  name = String

  age = Number || String

  birthday = Date || String

  school = String

  major = String

  career = String

  workExperience: String

  projectDescription = {
    type: String,
    min: 10,
    max: 500,
  }


  skills = [String]


  dateCreated = {
    type: String || Date,
    autovalue() {
      return { $push: new Date() }
    },
  }
}
