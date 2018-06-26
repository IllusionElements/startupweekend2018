import { Mongo } from 'meteor/mongo'

const Careers = new Mongo.Collection('careers', { idGeneration: 'MONGO' })

export default Careers
