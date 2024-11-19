const { validationResult } = require("express-validator");
const Task = require("../models/Task");
const formidable = require("formidable");
const { errorHandler } = require("../helpers/dbErrorHandler");
const Category = require("../models/category");

// Display all tasks
const displayTasks = async (req, res, next) => {
  let tasks;

  try {
    tasks = await Task.find({});
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve tasks, please try again later." });
  }

  res.status(200).json({
    tasks: tasks.map((task) => task.toObject({ getters: true })),
  });
};

// Create a new task
const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid input, please check the data provided." });
  }

  const { title, category, priority } = req.body;

  const newTask = new Task({
    title,
    category,
    priority,
  });

  try {
    await newTask.save();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to create a new task, please try again." });
  }

  res.status(201).json({ task: newTask });
};

// Edit a task
const editTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid input, please check the data provided." });
  }

  const { title, category, priority } = req.body;
  const taskID = req.params.taskID;
  let task;

  try {
    task = await Task.findById(taskID);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "A problem occurred. Task could not be edited." });
  }

  if (!task) {
    return res.status(404).json({ message: "Task not found." });
  }

  task.title = title;
  task.category = category;
  task.priority = priority;

  try {
    await task.save();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "A problem occurred. Task could not be edited." });
  }

  res.status(200).json({
    message: "Task updated successfully!",
    task: task.toObject({ getters: true }),
  });
};

// Delete a task
const deleteTask = async (req, res, next) => {
  const taskID = req.params.taskID;
  let task;

  try {
    task = await Task.findById(taskID);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "A problem occurred. Task cannot be deleted." });
  }

  if (!task) {
    return res.status(404).json({ message: "This task could not be found." });
  }

  try {
    await Task.findByIdAndDelete(taskID);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "A problem occurred. Task cannot be deleted." });
  }

  res.status(200).json({ message: "Task deleted successfully." });
};

// Display tasks by category
const displayTasksByCategory = async (req, res, next) => {
  const { category } = req.params;
  let tasks;

  try {
    tasks = await Task.find({ category });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve tasks, please try again later." });
  }

  res.status(200).json({
    tasks: tasks.map((task) => task.toObject({ getters: true })),
  });
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().exec();
    const count = await Task.countDocuments().exec();

    res.json({
      meta: {
        totalCount: count,
      },
      tasks,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Find task by ID middleware
exports.findTaskById = async (req, res, next, id) => {
  try {
    const task = await Task.findById(id).exec();
    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }
    req.task = task;
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Get a single task
exports.getTask = (req, res) => {
  return res.json(req.task);
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const task = req.task;
  try {
    const result = await Task.deleteOne({ _id: task._id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Create or update a task

// exports.createOrUpdateTask = async (req, res) => {
//   try {
//     // Destructure fields from the request body
//     const { title, description, status, user, category, priority } = req.body;

//     // Validate required fields
//     if (!title || !description || !user || !category) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Validate the priority value
//     if (priority && !["High", "Medium", "Low"].includes(priority)) {
//       return res.status(400).json({ error: "Invalid priority value" });
//     }

//     let task;
//     if (req.task) {
//       // Update existing task
//       task = await Task.findByIdAndUpdate(
//         req.task._id,
//         { title, description, status, user, category, priority },
//         { new: true }
//       );
//     } else {
//       // Create a new task
//       task = new Task({
//         title,
//         description,
//         status,
//         user,
//         category,
//         priority,
//       });
//       await task.save();
//     }

//     return res.status(201).json({ task });
//   } catch (error) {
//     console.error("Error in createOrUpdateTask:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

//

// POST route handler for creating or updating a task
exports.createOrUpdateTask = async (req, res) => {
  try {
    const { title, description, category, priority, status, user, picture } =
      req.body;

    // Validate required fields
    if (!title || !description || !category || !user) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate priority
    const validPriorities = ["High", "Medium", "Low"];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ error: "Invalid priority value" });
    }

    // Validate status
    const validStatus = ["Not started", "Started", "Completed"];
    if (status && !validStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Validate picture URL (basic check)
    if (!picture) {
      return res.status(400).json({ error: "Please enter pix" });
    }

    // Prepare task data
    const taskData = {
      title,
      description,
      category,
      priority: priority || "Medium", // Set default if not provided
      status: status || "Not started", // Set default if not provided
      user,
      picture,
    };

    let task;
    if (req.task) {
      // Update existing task
      task = await Task.findByIdAndUpdate(req.task._id, taskData, { new: true })
        .populate("user", "name email") // Populate user with selected fields
        .populate("category", "name"); // Populate category with selected fields
    } else {
      // Create new task
      task = new Task(taskData);
      await task.save();

      // Populate after saving
      task = await Task.findById(task._id)
        .populate("user", "name email")
        .populate("category", "name");
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error("Error saving task:", error.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// Get all task categories
exports.getTaskCategories = async (req, res) => {
  try {
    const categoryIds = await Task.distinct("category").exec();
    const categories = await Category.find({
      _id: { $in: categoryIds },
    }).exec();

    res.json({
      meta: {
        countCategories: categories.length,
      },
      categories,
    });
  } catch (err) {
    console.error("Error retrieving categories:", err);
    return res.status(400).json({ error: "Error retrieving categories" });
  }
};

// Get filtered tasks based on various criteria
exports.getFilteredTasks = async (req, res) => {
  const order = req.body.order || "desc";
  const sortBy = req.body.sortBy || "date";
  const limit = Number(req.body.limit) || 100;
  const skip = Number(req.body.skip) || 0;
  const findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  try {
    const tasks = await Task.find(findArgs)
      .populate("category")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec();

    res.json({
      size: tasks.length,
      tasks,
    });
  } catch (err) {
    console.error("Error retrieving tasks:", err);
    return res.status(400).json({ error: "Tasks not found" });
  }
};

// Search tasks by title
exports.getSearchedTasks = async (req, res) => {
  try {
    const query = {};
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: "i" };
      if (req.query.category && req.query.category !== "All") {
        query.category = req.query.category;
      }

      const tasks = await Task.find(query).exec();
      res.json(tasks);
    } else {
      res.status(400).json({ error: "Search query is required" });
    }
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) });
  }
};

// Fetch task by ID and populate user and category
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id)
      .populate("user", "name email") // Populate user with name and email
      .populate("category", "name"); // Populate category with name

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    console.log("Fetching all tasks...");

    // Fetch all tasks with populated user and category fields
    const tasks = await Task.find()
      .populate("user", "name email") // Populate user fields
      .populate("category", "name"); // Populate category fields

    // Log the fetched tasks
    console.log("Fetched Tasks with Populate:", JSON.stringify(tasks, null, 2));

    if (!tasks || tasks.length === 0) {
      console.log("No tasks found");
      return res.status(404).json({ error: "No tasks found" });
    }

    // Send the populated tasks
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// Export the controller functions
exports.displayTasks = displayTasks;
exports.createTask = createTask;
exports.editTask = editTask;
exports.deleteTask = deleteTask;
exports.displayTasksByCategory = displayTasksByCategory;
