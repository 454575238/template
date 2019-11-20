import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactRouter from './router/index'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'
import './app.less'
import 'antd/dist/antd.css'

type ReactRouter = typeof ReactRouter
const renderRouter = (Router: ReactRouter) => {
  const App = () => {
    return (
      <AppContainer>
        <BrowserRouter>
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
    // Get the updated code
    renderRouter(require('./router/index').default)
  })
}

renderRouter(ReactRouter)
