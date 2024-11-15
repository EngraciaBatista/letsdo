// const express = require("express");
// const { check } = require("express-validator");
// const usersControllers = require("../controllers/users-controllers");

// const router = express.Router();

// router.post(
//   "/users/signup",
//   [
//     check("name").notEmpty(),
//     check("email").notEmpty(),
//     check("hashed_password").notEmpty(),
//   ],
//   usersControllers.createUser
// );

// router.get("/", usersControllers.displayUsers);

// /* router.post("/login", [
//     check("email").isEmail(),
//     check("password").notEmpty()
// ],
// usersControllers.login); */

// const {
//   findUserById,
//   getUser,
//   updateUser,
// } = require("../controllers/users-controllers");
// const { requireSignin, isAuth } = require("../controllers/auth-controller");

// router.get("/secret/:userId", requireSignin, isAuth, (req, res) => {
//   res.json({
//     user: req.profile,
//   });
// });

// router.get("/get/user/:userId", requireSignin, isAuth, getUser);
// router.patch("/update/user/:userId", requireSignin, isAuth, updateUser);

// router.param("userId", findUserById);

// module.exports = router;

const express = require("express");
const { check } = require("express-validator");
const {
  createUser,
  getUser,
  displayUsers,
  findUserById,
  updateUser,
} = require("../controllers/users-controllers");
const { requireSignin, isAuth } = require("../controllers/auth-controller");

const router = express.Router();

router.post(
  "/users/signup",
  [
    check("name").notEmpty(),
    check("email").notEmpty(),
    check("hashed_password").notEmpty(),
  ],
  createUser
);

router.get("/", displayUsers);

router.get("/secret/:userId", requireSignin, isAuth, (req, res) => {
  res.json({ user: req.profile });
});

router.get("/get/user/:userId", requireSignin, isAuth, getUser);
router.patch("/update/user/:userId", requireSignin, isAuth, updateUser);

router.param("userId", findUserById);

module.exports = router;
