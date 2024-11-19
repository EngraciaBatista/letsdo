const express = require("express");
const router = express.Router();

const {
  getCategories,
  createOrUpdateCategory,
  findCategoryById,
  getCategory,
  deleteCategory,
} = require("../controllers/category");
const { findUserById } = require("../controllers/users-controllers");

const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/auth-controller");

// router.post(
//   "/create/category/:userId",
//   requireSignin,
//   isAuth,
//   isAdmin,
//   createCategory
// );

router.get("/:categoryId", getCategory);
router.get("/", getCategories);

router.post(
  "/",
  // "/:userId",
  // requireSignin,
  // isAuth,
  // isAdmin,
  createOrUpdateCategory
);

router.delete("/:userId", requireSignin, isAuth, isAdmin, deleteCategory);

router.patch(
  "/update/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createOrUpdateCategory
);
// router.param("categoryId", findCategoryById);

// router.param("userId", findUserById);

module.exports = router;
