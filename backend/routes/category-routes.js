const express = require("express");
const router = express.Router();

const {
  getCategories,
  createOrUpdateCategory,
  findCategoryById,
  getCategory,
  deleteCategory,
} = require("../controllers/category");
const { findUserById } = require("../controllers/user");

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

router.get("/get/category/:categoryId", getCategory);
router.get("/get/categories", getCategories);

router.post(
  "/create/category/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createOrUpdateCategory
);

router.delete(
  "/delete/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  deleteCategory
);

router.patch(
  "/update/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createOrUpdateCategory
);
router.param("categoryId", findCategoryById);

router.param("userId", findUserById);

module.exports = router;
