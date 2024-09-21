import { atom } from "recoil"


const userDetailsAtom = atom({
  key: "user-details",
  default: {
    name: "",
    email: "",
  }
})


export {
  userDetailsAtom,
}