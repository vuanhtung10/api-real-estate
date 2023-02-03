const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wardSchema = new Schema(
    {
        name: {type: String},
        code: {type: Number},
        division_type: {type: String},
        codename: {type: String},
        short_codename: {type: String},
        code_province: {type: Number},
        code_district: {type: Number},
    },
);

module.exports = mongoose.model('ward', wardSchema, 'ward');