const Product = require("../models/Product");

const addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    product.reviews.push(req.body);
    await product.save();
    res.json(product.reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllReviews = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const product = await Product.findById(req.params.productId)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(product.reviews);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
};

const updateReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    const review = product.reviews.id(req.params.reviewId);
    if (!review) {
      throw new Error("Review not found");
    }
    review.set(req.body);
    await product.save();
    res.json(review);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    product.reviews.id(req.params.reviewId).remove();
    await product.save();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  addReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
