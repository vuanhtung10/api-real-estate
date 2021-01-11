const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const colorSchema = new Schema(
  {
    name: {type: String, require: true},
    display_name: {type: String, require: true},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
  },
);

module.exports = mongoose.model('color', colorSchema, 'color');