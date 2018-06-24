import SimpleSchema from 'simpl-schema'
import Model from '../../Model'

export default class KeywordModel extends Model {
  name = String

  relatedCareers = [String || SimpleSchema.id]
}
