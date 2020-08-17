import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactRouter from './router/index'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import './app.less'
import { createStore, Middleware, applyMiddleware, compose } from './redux/dist'
import { todoApp } from './module/reducers'
import { Provider } from 'react-redux'

const renderRouter = (Router: () => JSX.Element) => {
  const App = () => {
    return (
      <AppContainer>
        <BrowserRouter basename="/">
          <Router />
        </BrowserRouter>
      </AppContainer>
    )
  }

  const logger: Middleware = ({ getState, dispatch }) => {
    console.log(dispatch)
    const a = dispatch
    return next => action => {
      console.log('dispatching', action)
      console.log(a)
      const result = next(action)
      console.log('next state', getState())
      return result
    }
  }

  const store = createStore(todoApp, applyMiddleware(logger))

  console.log(store.getState())

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app'),
  )
}

if (module.hot) {
  module.hot.accept('./router', () => {
    renderRouter(require('./router/index').default)
  })
}

renderRouter(ReactRouter)
