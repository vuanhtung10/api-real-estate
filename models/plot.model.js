const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plotSchema = new Schema(
  {
    name: {type: String, require: true},
    description: {type: String},
    status:{type: String},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
  },
);

module.exports = mongoose.model('plot', plotSchema, 'plot');