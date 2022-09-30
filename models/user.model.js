const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname: {type: String},
    username: {type: String},
    password : {type: String, required: true},
    email: {type: String, required: true},
    role: {type: Schema.Types.ObjectId, ref: 'role'},
    birthday : {type: Date},
    adress : {type: Array},
    phone: {type: Number},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
  },
);

module.exports = mongoose.model('user', userSchema, 'user');