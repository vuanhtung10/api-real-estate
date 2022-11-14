const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String},
        content: {type: String},
        slug: {type: String},
        thumbnail: {type: String},
        is_recommend: { type: Boolean },
        is_top: { type: Boolean },
        is_published: { type: Boolean },
        view: { type: Number },
        create_at: {type: Date, default: Date.now},
        update_at: {type: Date, default: Date.now}
    },
);

module.exports = mongoose.model('article', articleSchema, 'article');