const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discountSchema = new Schema(
  {
    name: {type: String, require: true},
    type: {type: String, require: true},
    discount: {type: Number, require: true},
    display_name: {type: String, require: true},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
  },
);

module.exports = mongoose.model('discount', discountSchema, 'discount');