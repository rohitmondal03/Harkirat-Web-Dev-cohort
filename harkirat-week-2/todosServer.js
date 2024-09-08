const express = require("express");
const bodyParser = require("body-parser");


const app = express();
const PORT = 3000;

let todos = []


app.use(bodyParser.json())


const findIndex = (id) => {
  for (let index = 0; index < todos.length; index++) {
    if (todos[index].id === id) {
      return index;
    }
  }

  return -1;
}

const deleteTodoAtIndex = (idx) => {
  let tempArr = [];

  for (let index = 0; index < todos.length; index++) {
    if (index !== idx) tempArr.push(todos[index])
  }

  return tempArr;
}


app.get("/todos", (req, res) => {
  res.send(todos);
})

app.get("/todos/:id", (req, res) => {
  const index = findIndex(parseInt(req.params.id));

  if (index === -1) {
    res.status(404).send();
  } 
  else {
    let todo;

    for (let idx = 0; idx < todos.length; idx++){
      if(index === idx) {
        todo = todos[idx];
      }
    }

    res.status(201).send(todo);
  }
})

app.post("/todos", (req, res) => {
  const todo = {
    id: Math.floor(Math.random() * 10000000),
    title: req.body.title,
    description: req.body.description,
  }

  todos.push(todo);

  res.status(200).send(todo)
})

app.delete("/todos", (req, res) => {
  const index = findIndex(parseInt(req.body.id));

  if (index === -1) {
    res.status(404).send();
  }
  else {
    const newArray = deleteTodoAtIndex(index);
    todos = [...newArray];
    res.status(200).send(todos);
  }
})


app.listen(PORT)