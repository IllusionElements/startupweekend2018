import { load } from 'graphql-load'
import KeywordType from './entities/typedef.gql'
import KeywordQuery from './entities/Query.gql'
import KeywordResolver from './entities/Keywords.resolvers'

load({
  typeDefs: [KeywordType, KeywordQuery],
  resolvers: [KeywordResolver],
});
