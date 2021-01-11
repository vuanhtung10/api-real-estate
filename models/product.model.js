const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {type: String, require: true},
    price: {type: String},
    description: {type: String},
    guide: {type: String},
    color: {type: String},
    type: {type: String},
    quantity: {type: Number},
    quantity_size: {type: Array},
    images: {type: Array},
    style: [{type: Schema.Types.ObjectId, ref: 'style'}],
    collection: {type: Schema.Types.ObjectId, ref: 'collection'},
    origin: {type: Schema.Types.ObjectId, ref: 'origin'},
    brand: {type: Schema.Types.ObjectId, ref: 'brand'},
    feature: [{type: Schema.Types.ObjectId, ref: 'feature'}],
    sex: {type: Array},
    group: [{type: Schema.Types.ObjectId, ref: 'group'}],
    discount: {type: Schema.Types.ObjectId, ref: 'discount'},
    status: {type: Schema.Types.ObjectId, ref: 'status'},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
  },
);

module.exports = mongoose.model('product', productSchema, 'product');