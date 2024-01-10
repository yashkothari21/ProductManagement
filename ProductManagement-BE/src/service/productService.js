const ProductModel = require("../model/productModel");
const moment = require("moment");

const createProduct = async (product) => {
  const productName = await ProductModel.find({
    $and: [
      {
        name: { $regex: product.name, $options: "i" },
      },
      {
        is_deleted: false,
      },
    ],
  });
  if (productName.length !== 0) {
    return false;
  } else {
    const newProduct = {
      name: product.name,
      description: product.description,
      price: product.price,
      created_date: moment(),
      modified_date: moment(),
      is_deleted: false,
    };
    return await ProductModel.create(newProduct);
  }
};

const getProduct = async (id) => {
  const Product = await ProductModel.findOne({ _id: id, is_deleted: false });
  if (!Product) {
    return;
  }
  return Product;
};

const getProducts = async () => {
  return await ProductModel.find({ is_deleted: false });
};

const updateProduct = async (id, product) => {
  const Product = await ProductModel.findOne({ _id: id, is_deleted: false });     
  if (!Product) {
    return "product not found by given id";
  }
  const productName = await ProductModel.find({
    $and: [
      { name: { $regex: product.name, $options: "i" } },
      { _id: { $ne: id } },
    ],
  });
  if (productName.length !== 0) {
    return false;
  } else {
    const updateProduct = {
      name: product.name,
      description: product.description,
      price: product.price,
      modified_date: moment(),
      is_deleted: false,
    };
    return await ProductModel.findByIdAndUpdate(id, updateProduct, {
      new: true,
    });
  }
};

const deleteProduct = async (id) => {
  const deleteProduct = await ProductModel.findById({
    _id: id,
  });
  if (!deleteProduct) {
    return false;
  } else {
    return await ProductModel.findByIdAndDelete(id);
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
