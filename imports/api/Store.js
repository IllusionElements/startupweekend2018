import { Mongo } from 'meteor/mongo'

class EventEmitter {}

const setState = Symbol('setState')
const initConnection = Symbol('initConnection')
const previousId = new WeakMap()
class StateDispatcher extends EventEmitter {
  constructor(name, initalState) {
    super(name)
    this.INTERNAL_STATE = initalState
    this.once(initConnection, (collection) => {
      this.collection = collection
      Object.freeze(this.collection)
    })
    this.on(setState, ({ nextState }) => {
      const { _idPrevious, ...statePrevious } = previousId.get(this)
      this.stateHistory.set(_idPrevious, statePrevious)
      const currentState = this.store.get(this.getCurrentState()._id)
      this.stateHistory.set(this.current_ID, currentState)
      this.setState(nextState)
      this.emit('stateSet', {
        state: this.getCurrentState(),
      })
    })
  }

  getCurrentState = () => this
    .collection
    .find({})
    .sort({ _id: -1 })
    .limit(1)

  state = (cb, _id) => cb(this.store.get(_id))
}
export default class StateStore {
  history: any[]

  stateCollection = () => {
    const collection = new Mongo.Collection(this.name, {
      connection: null,
    })
    this.dispatcher.emit(initConnection, {
      collection,
    })
  }

  constructor(name, initalState) {
    const dispatcher = new StateDispatcher(name, initalState)
    this.dispatcher = dispatcher
    dispatcher.on('collectionCreated', (/* { collection } */) => '')
  }

  queries = new Map()

  createQuery = (name, query) => {
    const _query = this
      .stateCollection
      .createQuery(name, query)

    return _query
  }

  setState = (callback) => {
    const state = this.dispatcher.getCurrentState()
    const nextState = callback(state)
    this.dispatcher.emit(setState, { state: nextState })
  }
}
