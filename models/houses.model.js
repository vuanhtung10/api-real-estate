const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const housesSchema = new Schema(
    {
        // image:{type: String},
        // cover:{},
        name: {type: String},
        description: {type: String},
        area:{type: String},
        price: {type: String},
        direction:{type: String},
        city:{type: String},
        district:{type: String},
        adress:{type: String},
        user: {type: Schema.Types.ObjectId, ref: 'user'},
        status:{type: String},
        type:{ type: String},
        images:{ type: Array },
        plot:{type: Schema.Types.ObjectId, ref: 'plot'},
        create_at: {type: Date, default: Date.now},
        update_at: {type: Date, default: Date.now}
    },
);

module.exports = mongoose.model('houses', housesSchema, 'houses');