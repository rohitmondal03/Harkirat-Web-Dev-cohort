const express = require("express");

const PORT = 3000;

const app = express();

app.post("/post", (req, res) => {
  const data = req.body;
  res.status(200).json(data);
})


app.listen(PORT)