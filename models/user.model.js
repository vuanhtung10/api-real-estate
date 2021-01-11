const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    full_name: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: Schema.Types.ObjectId, ref: 'role'},
    password : {type: String, required: true},
    sex : {type: String},
    birthday : {type: Date},
    adress : {type: Array},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
  },
);

module.exports = mongoose.model('user', userSchema, 'user');