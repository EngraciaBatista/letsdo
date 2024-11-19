const express = require("express");
const { check, validationResult } = require("express-validator"); // Add validationResult
const tasksControllers = require("../controllers/tasks-controllers");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const formidable = require("formidable");
const Task = require("../models/Task");
const { errorHandler } = require("../helpers/dbErrorHandler");
const Category = require("../models/category");

router.post("/", tasksControllers.createOrUpdateTask);
router.patch(
  "/:taskID",
  [
    check("title").notEmpty(),
    check("category").notEmpty(),
    check("priority").isIn(["High", "Medium", "Low"]),
  ],
  tasksControllers.editTask
);

router.delete("/:taskID", tasksControllers.deleteTask);

//router.get("/", tasksControllers.displayTasks);
router.get("/", tasksControllers.getAllTasks);

router.get("/category/:category", tasksControllers.displayTasksByCategory);

module.exports = router;
