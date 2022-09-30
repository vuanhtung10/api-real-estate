const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const relationSchema = new Schema(
  {
    plot:{type: Schema.Types.ObjectId, ref: 'plot'},
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    price: {type:String},
    profit: {type:String},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
  },
);

module.exports = mongoose.model('relation', relationSchema, 'relation');