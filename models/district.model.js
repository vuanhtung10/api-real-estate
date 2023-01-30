const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const districtSchema = new Schema(
    {
        name: {type: String},
        code: {type: Number},
        division_type: {type: String},
        codename: {type: String},
        short_codename: {type: String},
        code_province: {type: Number},
    },
);

module.exports = mongoose.model('district', districtSchema, 'district');