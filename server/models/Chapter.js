const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    chapter_id: {
        type: Number,
        required: true
    },
    chapter_title: {
        type: String,
        required: true
    },
}, { timestamps: true })

exports.Chapter = mongoose.model("Chapter", chapterSchema)