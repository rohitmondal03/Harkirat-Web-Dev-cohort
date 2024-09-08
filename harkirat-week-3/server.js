const express = require("express");
const cors = require("cors");
const fs = require("fs")
const bodyParser  = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());



app.listen(PORT)