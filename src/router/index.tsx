import { FC } from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import Home from '@/pages/home'
import Count from '@/pages/count'

const Router: FC = () => (
  <div className="layout" style={{ height: '100%' }}>
    <header>
      <Link to="/">to home</Link>
      <Link to="/count">to count</Link>
    </header>
    <main style={{ height: '100%' }}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/count" exact component={Count} />
      </Switch>
    </main>
  </div>
)

export default Router
