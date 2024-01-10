const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true 
  },
  description: {
    type: String,
    require: true,
  },    
  price: {
    type: String,
    require: true,
  },

  created_date: { type: Date },
  modified_date: { type: Date },
  is_deleted: { type: Boolean },
});

module.exports = mongoose.model("Product", ProductSchema);
