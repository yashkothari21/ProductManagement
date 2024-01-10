const express = require("express");
const auth = require("../helper/auth")
const Role = require("../helper/role")
const {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct} = require("../controller/productController");

const router = express.Router();


router.post("/createProduct",auth(Role.Admin),createProduct);
router.get("/getProducts",auth(),getAllProduct)
router.get("/getProduct/:id",auth(Role.Admin),getProduct);
router.put("/updateProduct/:id",auth(Role.Admin),updateProduct);
router.delete("/deleteProduct/:id",auth(Role.Admin),deleteProduct);

module.exports = router;  