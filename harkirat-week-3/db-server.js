// gctkZiNHFe894OCH
// mongodb+srv://rohitmondall:<db_password>@democluster.yh3vzo1.mongodb.net/

const express = require("express");
const cors = require("cors");
const fs = require("fs")
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json())


// Mongoose schema
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
})

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourse: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseModel"
  }]
})

// Models
const UserModel = mongoose.model("UserModel", userSchema);
const AdminModel = mongoose.model("AdminModel", adminSchema);

// const getAllCoursesDetails = await UserModel.findById("id").populate("purchasedCourse");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL, {
  dbName: "harkirat-course",
  writeConcern: "majority",
  retryWrites: true,
})


const SECRET = "s3cr3t_K3y"


const generateJwt = (user) => {
  const payload = {
    username: user.username
  }

  return jwt.sign(payload, SECRET, {
    expiresIn: "10h"
  })
}


app.post("/user/login", async (req, res) => {
  const { username, password } = req.headers;

  const user = await UserModel.findOne({ username });

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


app.post("/user/signup", async (req, res) => {
  const { username, password } = req.body;

  const admin = await UserModel.findOne({ username });

  if (admin) {
    res.status(403).json({
      message: "USER already exits"
    })
  } else {
    const newUser = new UserModel({ username, password });
    await newUser.save();

    const token = generateJwt(newUser)

    res.json({
      message: "USER created !!",
      token,
    })
  }
})


app.post("/admin/login", async (req, res) => {
  const { username, password } = req.headers;

  const admin = await AdminModel.findOne({ username })

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


app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;

  const admin = await AdminModel.findOne({ username });

  if (admin) {
    res.status(403).json({
      message: "ADMIN already exits"
    })
  } else {
    const newAdmin = new AdminModel({ username, password });
    await newAdmin.save()

    const token = generateJwt(newAdmin)

    res.json({
      message: "ADMIN created",
      token,
    })
  }
})


app.get("/admins", async (req, res) => {
  res.json(await AdminModel.find())
})


app.get("/users", async (req, res) => {
  res.json(await UserModel.find())
})


app.listen(PORT)