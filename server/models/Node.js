const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nodeSchema = new Schema({
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

exports.Node = mongoose.model("Node", nodeSchema);