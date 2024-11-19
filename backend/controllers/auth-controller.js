const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt"); // Updated import
const { errorHandler } = require("../helpers/dbErrorHandler");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  console.log("req.body", req.body); // Log request body for debugging

  const { name, email, password, photo } = req.body; // Use 'picture' instead of 'pictureUrl'

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists with email:", email); // Log this information
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      hashed_password,
      photo: photo || null, // Store the provided picture URL (or null if not provided)
    });

    // Save the user
    await user.save();

    // Remove sensitive data
    user.salt = undefined;
    user.hashed_password = undefined;

    // Send the response
    res.json({ user });
  } catch (err) {
    console.error("Error during signup:", err); // Log the full error
    return res.status(400).json({ error: errorHandler(err) });
  }
};

// exports.signup = async (req, res) => {
//   console.log("req.body", req.body); // Log request body for debugging

//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       console.log("User already exists with email:", email); // Log this information
//       return res.status(400).json({ error: "Email is already taken" });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashed_password = await bcrypt.hash(password, salt);

//     const user = new User({
//       name,
//       email,
//       hashed_password,
//     });

//     // Save the user
//     await user.save();

//     // Remove sensitive data
//     user.salt = undefined;
//     user.hashed_password = undefined;

//     // Send the response
//     res.json({ user });
//   } catch (err) {
//     console.error("Error during signup:", err); // Log the full error
//     return res.status(400).json({ error: errorHandler(err) });
//   }
// };

// exports.signup = async (req, res) => {
//   console.log("req.body", req.body);
//   try {
//     const user = await new User(req.body).save();
//     user.salt = undefined;
//     user.hashed_password = undefined;
//     res.json(user);
//   } catch (err) {
//     return res.status(400).json({ error: errorHandler(err) });
//   }
// };

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }

    // If user is found make sure email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password don't match",
      });
    }

    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, "super_secret_secret");

    // persist the token as "t" in cookie with expiry date
    res.cookie("authtoken", token, { expire: new Date() + 9999 });

    // return response with user and token to front end client
    const { _id, name, email: userEmail, role } = user;
    return res.json({ token, user: { _id, email: userEmail, name, role } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("authtoken");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: "super_secret_secret",
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  const user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource! Access denied",
    });
  }
  next();
};
