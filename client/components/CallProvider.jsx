/* eslint-disable */
import React from 'react'

const promise = (...args) => new Promise((resolve, reject) => (
  Meteor.call(...args, (err, res) =>{
    if(err) reject(err)
    resolve(res)
  })))

const getDisplayName = (Component) => Component.displayName || Component.name || 'Component'

export const withCall = (param, ...args) => (Component)=> (
  class extends React.Component {
    static displayName = `withMeteorCall(${getDisplayName(Component)})`

    state = {
      loaded: false,
      careers: null
    }

    componentDidMount() {
      promise(param, ...args)
        .then(r => {
          this.setState({ loaded: true, careers: r})
          console.log(r)
        })
    }

    render() {
      if(!this.state.loaded) {
        return (
          <h1> ...Loading </h1>
        )
      }
      if(this.state.loaded && !this.state.careers) {
        console.log(this.state.careers)
        return (
          <h1>...oops error</h1>
        )
      }

      return (
        <Component careers={this.state.careers} {...this.props} />
      )
    }

  }
)

// export const Loadable = ({ isLoading, isError, Loader }) => (Component) => (
//   class extends React.Component {
//     static displayName = `Loadable(${getDisplayName(Component)})`

//     state = {
//       loading: true,
//       Component: {
//         Loaded: null,
//       },
//       error: false
//     }
//     componentDidMount() {
//       if(Loader instanceof Promise) {
//         Loader().then(Loaded => this.setState({
//           Component: {
//             Loaded,
//           },
//           loading: false
//         })).catch(err => this.setState({ loading: false, error: true}))
//       }
//     }

//     render() {
//       if(!loading && !error) {
//         const Loaded = this.state.Component.Loaded
//         return (
//           <Loaded {...this.props} />
//             <Component {...this.props} />
//           </Loaded>
//         )
//       }
//     }
//   }
// )

// export const importAll = async (...paths) => {
//   const imports = await paths.map(async (path) => {
//     const data = await import(path)
//     return data
//   })

//   return imports
// }

