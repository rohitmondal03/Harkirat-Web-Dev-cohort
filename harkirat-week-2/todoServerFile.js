const express = require("express");
const fs = require("fs")
const bodyParser = require("body-parser");
const path = require("path")
const cors = require("cors")

const app = express();
const PORT = 3000;
const SOLUTION_FILE = "todoServer.json"


app.use(bodyParser.json())
app.use(cors())


const findIndex = (arr, id) => {
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].id === id) {
      return index;
    }
  }

  return -1;
}

const deleteTodoAtIndex = (arr, idx) => {
  let tempArr = [];

  for (let index = 0; index < arr.length; index++) {
    if (index !== idx) tempArr.push(arr[index])
  }

  return tempArr;
}


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/todos", (req, res) => {
  fs.readFile(SOLUTION_FILE, "utf-8", (err, data) => {
    if (err) throw new Error(err.message);
    res.status(200).json(JSON.parse(data))
  })
})

app.get("/todos/:id", (req, res) => {
  fs.readFile(SOLUTION_FILE, "utf-8", (err, data) => {
    if (err) throw new Error(err);

    const id = parseInt(req.params.id);

    const allTodos = JSON.parse(data);
    const index = findIndex(allTodos, id);

    if (index === -1) {
      res.status(404).send();
    }
    else {
      const todo = allTodos[index];
      res.status(200).send(todo)
    }
  })
})

app.post("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 10000000),
    title: req.body.title,
    description: req.body.description,
  }

  fs.readFile(SOLUTION_FILE, "utf-8", (err, data) => {
    if (err) throw new Error(err)

    const prevTodos = JSON.parse(data);
    prevTodos.push(newTodo);

    fs.writeFile(SOLUTION_FILE, JSON.stringify(prevTodos), (err) => {
      if (err) throw new Error(err)

      res.status(201).send(newTodo);
    })
  })
})

app.delete("/todos", (req, res) => {
  const id = parseInt(req.body.id);

  fs.readFile(SOLUTION_FILE, "utf-8", (err, data) => {
    if (err) throw new Error(err);

    const todo = JSON.parse(data);
    const index = findIndex(todo, id);

    if (index === -1) {
      res.status(404).send();
    }
    else {
      const newArray = deleteTodoAtIndex(todo, index);
      fs.writeFile(SOLUTION_FILE, JSON.stringify(newArray), (err) => {
        if (err) throw new Error(err)
        res.status(200).send(newArray)
      })
    }
  })
})


app.listen(PORT)