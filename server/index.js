const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI; //shift+alt+up arrow duplicating
const cors = require("cors"); //passing data and receiving data from front end
const app = express(); //consists of different methods in app

const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

app.use(express.json()); //receive and send in json format
app.use(cors({ origin: true }));
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
//CRUD
app.get("/", (req, res) => {
  res.send("welcome to our chat API...."); //sending data from node server to client which is browser here
});

app.listen(port, (req, res) => {
  //req receiving data from frontend ,res send data to front end
  console.log(`server running on port:${port}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connection establised ");
  })
  .catch((error) => {
    console.log("mongodb connecion failed", error.message);
  });
