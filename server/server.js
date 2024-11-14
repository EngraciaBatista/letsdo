const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users-routes");
const tasksRoutes = require("./routes/tasks-routes"); 

const app = express();

app.use(bodyParser.json());
app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);

mongoose.connect("mongodb+srv://gail:255650@cluster0.qod2v.mongodb.net/LetsDo?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(8080, () => {
      console.log("Server is running on http://localhost:8080");
    });
  })
  .catch(err => {
    console.log(err);
  });