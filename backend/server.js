const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users-routes.js");
const tasksRoutes = require("./routes/tasks-routes");
const authRoutes = require("./routes/auth-routes.js");
const categoryRoutes = require("./routes/category-routes.js");

const app = express();
app.use(morgan("dev"));
app.use(cookieParser());

app.use(bodyParser.json());
app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

mongoose
  .connect(
    "mongodb+srv://gail:255650@cluster0.qod2v.mongodb.net/LetsDo?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(8080, () => {
      console.log("Server is running on http://localhost:8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });
