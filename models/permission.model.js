const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const permissionSchema = new Schema(
  {
    name: {type: String, require: true},
    display_name: {type: String, require: true},
    description: {type: String},
    roles: [{type: Schema.Types.ObjectId, ref: 'role'}],
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
  },
);

module.exports = mongoose.model('permission', permissionSchema, 'permission');