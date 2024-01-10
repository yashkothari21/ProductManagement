const productService = require("../service/productService");

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    if (!product) {
      res.status(409).json({ error: "product name is already exits" });
    } else {
      res.json({ data: product, status: "success" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const product = await productService.getProducts();
    if (product.length === 0) {
      res.status(204).json({ status: "success" });
    } else {
      res.json({ data: product, status: "success" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await productService.getProduct(req.params.id);
    if (!product) {
      res.status(404).json({ error: "product not found by given id" });
    } else {
      res.json({ data: product, status: "success" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) {
      res.status(409).json({ error: "product name is already exits" });
    } else {
      if (product === "product not found by given id") {
        res.status(404).json({ error: "product not found by given id" });
      } else {
        res.json({ data: product, status: "success" });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) {
      res.status(404).json({ error: "product not found by given id" });
    }else{
      res.json({ data: product, status: "success" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
