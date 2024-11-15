const { errorHandler } = require("../helpers/dbErrorHandler");
const Category = require("../models/category");

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().exec();
    const count = await Category.countDocuments().exec();

    res.json({
      meta: {
        totalCount: count,
      },
      categories,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.createOrUpdateCategory = async (req, res) => {
  const { id } = req.params; // Get the ID from request params if available

  try {
    let category;

    if (id) {
      // Update existing category
      category = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      }).exec();
    } else {
      // Create new category
      category = await new Category(req.body).save();
    }

    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    res.json({ category });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

exports.findCategoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id).exec();
    if (!category) {
      return res.status(400).json({
        error: "Catgory not found",
      });
    }
    req.category = category;
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.deleteCategory = async (req, res) => {
  const { _id } = req.category; // Assuming req.product is set by a middleware or similar
  try {
    // Assuming product._id contains the ID of the product to delete
    const result = await Category.deleteOne({ _id });

    if (result.deletedCount === 0) {
      // No document was deleted
      return res.status(404).json({
        error: "Category not found",
      });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    // Log the error for debugging purposes
    console.error(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
