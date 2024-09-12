import express from "express"
import bodyParser from "body-parser";
import cors from "cors"

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


app.post("/post", (req, res) => {
  const data = req.body;
  res.status(200).json(data);
})

app.get("/post", (req, res) => {
  res.json({
    message: "Got a GET request !!"
  })
})


app.listen(PORT)