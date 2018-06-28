// @flow
import { Component as RC } from 'react'
import { inject } from '/lib/react/decorators'

type StateType = {
  condition: boolean
}
class Switch extends RC<any, StateType> {
  state = {
    condition: false,
  }

  @inject(['state', 'props'])
  render({ state, props }) {
    const { condition } = state
    const { children } = props
    return condition
      ? children
      : null
  }
}

export default Switch
