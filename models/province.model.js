const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const provinceSchema = new Schema(
    {
        name: {type: String},
        code: {type: Number},
        division_type: {type: String},
        codename: {type: String},
        phone_code: {type: Number},
        districts: { type: Array },
    },
);

module.exports = mongoose.model('province', provinceSchema, 'province');