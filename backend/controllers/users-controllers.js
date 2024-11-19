// const { validationResult } = require("express-validator");
// const User = require("../models/User");
// //const HttpError = require("../models/http-error");

// const createUser = async (req, res, next) => {
//   const { name, email, completed, picture, created, hashed_password } =
//     req.body;

//   const newUser = new User({
//     name,
//     email,
//     completed,
//     picture,
//     created,
//     hashed_password,
//   });

//   try {
//     await newUser.save();
//   } catch (err) {
//     return next("Failed to create user. Please try again.");
//   }

//   res.status(201).json({ user: newUser });
// };

// const displayUsers = async (req, res, next) => {
//   let users;

//   try {
//     users = await User.find({}, "-hashed_password");
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Unable to retrieve users, please try again later." });
//   }

//   res.status(200).json({
//     users: users.map((user) => user.toObject({ getters: true })),
//   });
// };

// findUserById = async (req, res, next, id) => {
//   try {
//     const user = await User.findById(id).exec();
//     if (!user) {
//       return res.status(400).json({
//         error: "User not found",
//       });
//     }
//     req.profile = user;
//     next();
//   } catch (err) {
//     return res.status(500).json({
//       error: "Internal server error",
//     });
//   }
// };

// updateUser = async (req, res) => {
//   try {
//     // Use findByIdAndUpdate instead of findOneAndUpdate for simplicity and clarity
//     const user = await User.findByIdAndUpdate(
//       req.profile._id, // Query to find user by ID
//       { $set: req.body }, // Update the user's fields with the request body
//       { new: true } // Return the updated document
//     ).exec();

//     if (!user) {
//       return res.status(404).json({
//         error: "User not found",
//       });
//     }

//     // Remove sensitive fields
//     user.hashed_password = undefined;
//     user.salt = undefined;

//     // Send the updated user data
//     res.json(user);
//   } catch (err) {
//     console.error("Error updating user:", err);
//     res.status(400).json({
//       error: "You are not authorized to perform this action",
//     });
//   }
// };

// // TODO: This won't work with the hashed password. We need another module to handle that OR we have to change the password field.

// /* const login = async (req, res, next) => {
//     const errors = validationResult(req);

//     const {email, password} = req.body;

//       let existingUser;

//       try {
//         existingUser = await User.findOne({ email: email});
//       } catch (err) {
//         return res.status().json({message: "Login Failed."});
//       }

//       if(!existingUser) {
//         return res.status().json({message: "User does not exist. Please create an account."});
//       }

//       if (existingUser.hashed_password !== password) {
//         return res.status.json({message: "Invalid password. Please try again."});
//       }
//       res.json({ message: "Successfully logged in!", userID: existingUser.id })

// } */

// exports.createUser = createUser;
// exports.displayUsers = displayUsers;
// exports.findUserById = findUserById;
// exports.updateUser = updateUser;
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const createUser = async (req, res, next) => {
  const { name, email, password, completed, picture, created } = req.body;

  // Hash the password
  let hashed_password;
  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    hashed_password = await bcrypt.hash(password, salt); // Hash the password with the salt
  } catch (err) {
    return next(new Error("Error hashing password"));
  }

  // Create the new user with the hashed password
  const newUser = new User({
    name,
    email,
    completed,
    picture,
    created,
    hashed_password, // Save the hashed password
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new Error("Failed to create user. Please try again."));
  }

  res.status(201).json({ user: newUser });
};

// Controller to create a new user
// const createUser = async (req, res, next) => {
//   const { name, email, completed, picture, created, hashed_password } =
//     req.body;

//   const newUser = new User({
//     name,
//     email,
//     completed,
//     picture,
//     created,
//     hashed_password,
//   });

//   try {
//     await newUser.save();
//   } catch (err) {
//     return next("Failed to create user. Please try again.");
//   }

//   res.status(201).json({ user: newUser });
// };

// Controller to display all users
const displayUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-hashed_password");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve users, please try again later." });
  }

  res.status(200).json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

// Controller to find user by ID
const findUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.profile = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.profile._id,
      { $set: req.body },
      { new: true }
    ).exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.hashed_password = undefined;
    user.salt = undefined;

    res.json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res
      .status(400)
      .json({ error: "You are not authorized to perform this action" });
  }
};

// In users-controllers.js
const getUser = async (req, res, next) => {
  try {
    const user = req.profile;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Combined Export
module.exports = {
  getUser,
  createUser,
  displayUsers,
  findUserById,
  updateUser,
};
