import React, { lazy, Suspense } from 'react'
import { Link, Route, Switch } from 'react-router-dom'

// import Home from '@/pages/home'
// import Count from '@/pages/Count'

const home = 'home'
const count = 'Count'
const Home = lazy(() => import(`@/pages/${home}/index`))

const Count = lazy(() => import(`@/pages/${count}`))

// const Home = lazy(() =>
//   import(/* webpackChunkName: "my-chunk-home" */ `@/pages/home`),
// )

// const Count = lazy(() =>
//   import(/* webpackChunkName: "my-chunk-count" */ `@/pages/Count`),
// )

const Router = () => (
  <div className="layout">
    <header>
      <Link to="/">to home</Link>
      <Link to="/count">to count</Link>
    </header>
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/count" exact component={Count} />
        </Switch>
      </Suspense>
    </main>
  </div>
)

export default Router
