const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    token: {type: String, require: true},
    user_id: {type: Schema.Types.ObjectId, ref: 'user'},
    create_at: {type: Date, default: Date.now}
  },
);

module.exports = mongoose.model('token', tokenSchema, 'token');