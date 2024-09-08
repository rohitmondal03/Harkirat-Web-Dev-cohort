const fs = require("fs")
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000;

// app.use calls a middleware
app.use(bodyParser.json());

function calculateSum(counter) {
  let sum = 0;

  for (let i = 1; i <= counter; i++) {
    sum += i;
  }

  return sum;
}

const handleFirstRequest = (req, res) => {
  // const counter = calculateSum(45);
  // res.send('Hello World!')
  var counter = req.query.counter;
  // var counter = req.headers.counter;

  // var counter = req.body.counter;
  // will only run if we use app.use(bodyParser.json())

  if (counter < 1000) {
    console.log(counter);
    const answer = "the count is " + counter

    var answerObject = {
      sum: answer,
    }

    res.send(answerObject);
  } 
  else {
    res.status(411).send("You've sent a very big number")
  }
}

function createUser(req, res) {
  res.send("POST request")
}

function started() {
  console.log(`Server started in port: ${port}`)
}

function middleware1(req, res, next) {
  console.log("middlweware header ",req.headers.counter)
  // res.send("Error from inside middleware !!")

  next();  // tells request to go to server, only when this is called !!
}

app.use(middleware1)

app.get('/handle', handleFirstRequest)
app.post("/create-user", createUser)

app.listen(port, started)


// const callbackFn = (err, data) =>{
//   console.log(data)
// }

// fs.readFile("a.txt", "utf-8", callbackFn)

// console.log(calculateSum(4))