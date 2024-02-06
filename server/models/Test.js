const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false
    },
    data: {
        type: Object,
        required: true
    },
    position: {
        type: Object,
        required: false
    }
}, { timestamps: true })

exports.Test = mongoose.model("Test", testSchema);