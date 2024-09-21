const moongoose = require("moongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { postReqMiddleware } = require("./middleware/demo-post-req");
const { BASE_URL } = require("./config")

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get("/admin", (req, res) => {
  res.json("Getting response !!")
})

app.post("/post-req", postReqMiddleware, (req, res) => {
  const data = req.query;

  res.json({ ...data });
})


// moongoose.connect("")

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});