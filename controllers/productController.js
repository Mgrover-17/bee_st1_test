
const Product = require('../models/Product');


const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  try {
    const products = await Product.find()
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(products);
} catch (error) {
  res.status(500).json({ error: 'Internal Server Error' });
}
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Product not found' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Product not found' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: 'Product not found' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
