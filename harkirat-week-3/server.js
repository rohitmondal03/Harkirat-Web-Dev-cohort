const express = require("express");
const cors = require("cors");
const fs = require("fs")
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());


let ADMINS = [];
let USERS = [];


const usersAuthMiddleware = (req, res, next) => {
  const { email } = req.headers;

  const user = USERS.find(data => data.email === email)

  if (user) {
    req.user = user;
    next();
  }
  else {
    res.status(401).send({
      message: "User don't exist"
    })
  }
}


const adminsAuthMiddleware = (req, res, next) => {
  const { email, password } = req.headers;

  const admin = ADMINS.find(data => data.email === email);

  if (admin) {
    next();
  }
  else {
    res.status(403).send({
      message: "NOT Authorized"
    })
  }
}


app.post("/user/login", usersAuthMiddleware, (req, res) => {
  res.json({
    message: "User logged in"
  })
})


app.post("/user/signup", (req, res) => {
  const { email, password } = req.body;

  const existingUser = USERS.find(data => data.email === email);

  if (existingUser) {
    res.status(403).json({
      message: "USER already exits"
    })
  } else {
    USERS.push({ email, password });
    res.json({
      message: "USER created !!"
    })
  }
})


app.post("/admin/login", adminsAuthMiddleware, (req, res) => {
  res.json({
    message: "ADMIN logged in"
  })
})


app.post("/admin/signup", (req, res) => {
  const { email, password } = req.body;

  const existingUser = ADMINS.find(data => data.email === email);

  if (existingUser) {
    res.status(403).json({
      message: "ADMIN already exits"
    })
  } else {
    ADMINS.push({ email, password })
    res.json({
      message: "ADMIN created"
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