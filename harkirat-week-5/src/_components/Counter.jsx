import { memo } from "react"

function Counter({counter}) {
  return (
    <p>{counter}</p>
  )
}

export default memo(Counter)