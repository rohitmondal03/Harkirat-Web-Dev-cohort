const express = require("express");
const cors = require("cors");
const fs = require("fs")
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken")

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json())


let ADMINS = [];
let USERS = [];
const SECRET = "s3cr3t_K3y"


// const usersAuthMiddleware = (req, res, next) => {
//   const { email } = req.headers;

//   const user = USERS.find(data => data.email === email)

//   if (user) {
//     req.user = user;
//     next();
//   }
//   else {
//     res.status(401).send({
//       message: "User don't exist"
//     })
//   }
// }


// const adminsAuthMiddleware = (req, res, next) => {
//   const { email, password } = req.headers;

//   const admin = ADMINS.find(data => data.email === email);

//   if (admin) {
//     next();
//   }
//   else {
//     res.status(403).send({
//       message: "NOT Authorized"
//     })
//   }
// }



const generateJwt = (user) => {
  const payload = {
    username: user.username
  }

  return jwt.sign(payload, SECRET, {
    expiresIn: "10h"
  })
}


app.post("/user/login", (req, res) => {
  const { username, password } = req.headers;

  const user = USERS.find((user) => user.username === username && user.password === password);

  if (user) {
    const token = generateJwt(user);

    res.json({
      message: "Logged in successfully",
      token,
    })
  }
  else {
    res.status(403).json({
      message: "USER not logged in !!"
    })
  }
})


app.post("/user/signup", (req, res) => {
  const { username, password } = req.body;

  const existingUser = USERS.find(data => data.username === username && data.password === password);

  if (existingUser) {
    res.status(403).json({
      message: "USER already exits"
    })
  } else {
    const newUser = {
      username, password,
    }

    USERS.push(newUser);

    const token = generateJwt(newUser)

    res.json({
      message: "USER created !!",
      token,
    })
  }
})


app.post("/admin/login", (req, res) => {
  const { username, password } = req.headers;

  const admin = ADMINS.find((data) => data.username === username && data.password === password);

  if (admin) {
    const token = generateJwt(admin);

    res.json({
      message: "Logged in successfully",
      token,
    })
  }
  else {
    res.status(403).json({
      message: "ADMIN auth failed !!"
    })
  }
})


app.post("/admin/signup", (req, res) => {
  const { username, password } = req.body;

  const existingAdmin = ADMINS.find(data => data.username === username && data.password === password);

  if (existingAdmin) {
    res.status(403).json({
      message: "ADMIN already exits"
    })
  } else {
    const newAdmin = {
      username, password,
    }

    ADMINS.push(newAdmin)

    const token = generateJwt(newAdmin)

    res.json({
      message: "ADMIN created",
      token,
    })
  }
})


app.get("/admins", (req, res) => {
  res.json(ADMINS)
})


app.get("/users", (req, res) => {
  res.json(USERS)
})


app.listen(PORT)