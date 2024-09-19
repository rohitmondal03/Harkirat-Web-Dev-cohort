import React from 'react'
import { Route } from "wouter"

function App() {
  return (
    <div>
      <Route path={"/course"}>Course page !!</Route>
      <Route path={"/course/:name"}>
        {(params) => <>Hello {params.name}</>}
      </Route>
    </div>
  )
}

export default App