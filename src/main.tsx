import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactRouter from './router/index'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import './app.less'
import { createStore } from './redux/dist'
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

  const store = createStore(todoApp)

  console.log(store.getState())

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app'),
  )
}
// @ts-ignore
if (module && module.hot) {
  // @ts-ignore
  module.hot.accept('./router', () => {
    renderRouter(require('./router/index').default)
  })
}

renderRouter(ReactRouter)
