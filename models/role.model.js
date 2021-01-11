const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    name: {type: String, require: true},
    display_name: {type: String, require: true},
    description: {type: String},
    permissions: [{type: Schema.Types.ObjectId, ref: 'permission'}],
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
  },
);

module.exports = mongoose.model('role', roleSchema, 'role');