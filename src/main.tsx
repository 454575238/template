import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactRouter from './App'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import './app.less'
import { createStore, Middleware, applyMiddleware, compose } from './redux/dist'
import { todoApp } from './module/reducers'
import { Provider } from 'react-redux'

const renderRouter = (Router: FC) => {
  const App: FC = () => {
    return (
      <AppContainer>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AppContainer>
    )
  }

  const logger: Middleware = ({ getState, dispatch }) => {
    return next => action => {
      console.log('dispatching', action)
      const result = next(action)
      console.log('next state', getState())
      return result
    }
  }

  const store = createStore(
    todoApp,
    { todos: [{ id: 1, text: '2', completed: true }] },
    applyMiddleware(logger),
  )

  const unsubscribe = store.subscribe(() => {
    console.log('subscribe')
  })

  unsubscribe()
  console.log(store.getState())

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app'),
  )
}

module?.hot.accept('./App', () => {
  renderRouter(require('./App').default)
})

renderRouter(ReactRouter)
