import { enumerable } from '../../../../lib/react/decorators.jsx'
import Model from '../../Model'

export default class UserDataModel extends Model {
  @enumerable()
  name = String

  @enumerable()
  age = Number || String

  @enumerable()
  birthday = Date || String

  @enumerable()
  school = String

  @enumerable()
  major = String

  @enumerable()
  career = String

  @enumerable()
  workExperience: String

  @enumerable()
  projectDescription = {
    type: String,
    min: 10,
    max: 500,
  }
}
