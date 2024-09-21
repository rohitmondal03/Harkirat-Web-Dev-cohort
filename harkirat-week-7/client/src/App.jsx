import React from 'react'
import { Route } from "wouter"
import CoursePage from './pages/course-page'

function App() {
  return (
    <div>
      <Route path={"/"}>
        <p>Home Page...</p>
      </Route>
      <Route path={"/course"}>
        <CoursePage />
      </Route>
      <Route path={"/course/:name"}>
        {(params) => <>Hello {params.name}</>}
      </Route>
    </div>
  )
}

export default App