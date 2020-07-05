import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactRouter from './router/index'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'

import './app.less'
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

  ReactDOM.render(<App />, document.getElementById('app'))
}
// @ts-ignore
if (module && module.hot) {
  // @ts-ignore
  module.hot.accept('./router', () => {
    renderRouter(require('./router/index').default)
  })
}

renderRouter(ReactRouter)
