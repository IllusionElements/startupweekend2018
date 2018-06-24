import { enumerable } from '../../../../lib/react/decorators.jsx'
import Model from '../../Model'

export default class CareersModel extends Model {
  @enumerable()
  name = String

  @enumerable()
  keywords = [String]
}
