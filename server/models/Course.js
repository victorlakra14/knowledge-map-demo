const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_id: {
        type: String,
        required: true
    },
    course_title: {
        type: String,
        required: true
    },
}, { timestamps: true })

exports.Course = mongoose.model("Course", courseSchema)