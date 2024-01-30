const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const edgeSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: false
    },
    target: {
        type: String,
        required: false
    },
    animated: {
        type: Boolean,
        required: false
    },
    label: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    labelStyle: {
        type: Object,
        required: false
    },
    style: {
        type: Object,
        required: false
    },
    arrowHeadType: {
        type: String,
        required: false
    },
}, { timestamps: true })

exports.Edge = mongoose.model("Edge", edgeSchema);