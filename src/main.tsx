import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './router'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

type reactRouter = typeof Layout

const renderRouter = (Router: reactRouter) => {

  const App = () => {
    return (
      <AppContainer>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AppContainer>
    )
  }

  ReactDOM.render(
    <App />,
     document.getElementById('app'),
  )
}

if (module.hot) {

  module.hot.accept('router', () => {
    // Get the updated code
    renderRouter(require('./router').default)
  })
}

renderRouter(Layout)
