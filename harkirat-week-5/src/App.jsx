import axios from "axios"
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

import Counter from "./_components/Counter";


export default function App() {
  // const setCounter = useSetRecoilState(countState);
  // const counter = useRecoilValue(countState);
  const [counter, setCounter]= useRecoilState(countState)

  const handlePostRequest = () => {
    axios.post("http://localhost:3000/post", {
      name: "Rohit Mondal",
      age: 20,
    })
      .then(res => console.log(res.data))
  }

  const handleGetRequest = () => {
    axios.get("http://localhost:3000/post")
      .then(res => console.log(res.data));
  }


  return (
    <div>
      <h2>Working with "axios"</h2>
      <button onClick={handlePostRequest}>POST request</button>
      <button onClick={handleGetRequest}>GET request</button>

      <hr />

      <h2>Counter app</h2>
      <button onClick={() => setCounter(prev => prev + 1)}>Increase counter</button>
      <Counter counter={counter} />
    </div>
  )
}


// Recoil state
const countState = atom({
  key: 'countState', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});