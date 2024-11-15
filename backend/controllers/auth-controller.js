const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt"); // Updated import
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const user = await new User(req.body).save();
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) });
  }
};

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
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

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
  secret: "hello",
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
