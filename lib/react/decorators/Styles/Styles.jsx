import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import injectProps from '../renderInject/injectProps.jsx'

export default function Styles(style) {
  return (Component) => {
    const Styled = withStyles(style)(Component)

    return class extends React.PureComponent {
      static displayName = `injectStyles(Styled(${Styled.displayName || Styled.name}))`

      @injectProps
      render({ children, ...props }) {
        return (
          <Styled {...props}>
            {children}
          </Styled>
        )
      }
    }
  }
}
