import React from 'react'
import { useRecoilState } from "recoil"
import { userDetailsAtom } from '../recoil/atoms'

function CoursePage() {
  const [details, setDetails] = useRecoilState(userDetailsAtom);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name is ${details.name} and email is ${details.email}`);
    setDetails({
      name: "",
      email: "",
    })
  }

  return (
    <div>
      <h2>Welcome to Course page !!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='enter name'
          value={details.name}
          onChange={e => setDetails(prev => ({ ...prev, name: e.target.value }))}
        />
        <input
          type="email"
          placeholder='enter email'
          value={details.email}
          onChange={e => setDetails(prev => ({ ...prev, email: e.target.value }))}
        />
        <button type='submit'>
          See details
        </button>
      </form>
    </div>
  )
}

export default CoursePage