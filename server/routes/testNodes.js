const express = require("express");
const mongoose = require("mongoose");
const { Test } = require("../models/Test")

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const testNode = new Test(req.body);
        await testNode.save().then((result) => {
            return res.status(200).json({
                message: "Test node added successfully",
                testNode: result
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
        const testNodes = await Test.find();
        // const testNodes = await mongoose.connection.db.collection("test").find().toArray();
        return res.status(200).json({
            message: "All test nodes fetched successfully",
            testNodes
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})

router.post("/filter", async (req, res) => {
    try {
        const { course_ids } = req.body;
        const courseIDsArray = course_ids.map(Number);
        const filtered_testNodes = await Test.find({"data.course_id": { $in: courseIDsArray }})
        return res.status(200).json({
            message: "All custom test nodes fetched successfully",
            filtered_testNodes
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})

router.put("/updateposition/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { position } = req.body;

        await Test.findByIdAndUpdate(id, { position }).then((result) => {
            return res.status(200).json({
                message: "Node position updated successfully",
                result
            })
        })

    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})

module.exports = router;