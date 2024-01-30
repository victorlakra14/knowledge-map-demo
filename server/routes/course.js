const express = require('express');
const { Course } = require("../models/Course");

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save().then((result) => {
            return res.status(200).json({
                message: "Course added successfully",
                course: result
            })
        }).catch((err) => {
            return res.status(500).json({
                message: "Something went wrong",
                error: err.message
            })
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})

router.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        return res.status(200).json({
            message: "All courses fetched successfully",
            courses
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})

module.exports = router;