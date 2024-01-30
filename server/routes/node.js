const express = require("express")
const { Node } = require("../models/Node")

const router = express.Router();

router.post("/add", async (req, res) => {
    try {

        const node = new Node(req.body);
        await node.save().then((result) => {
            return res.status(200).json({
                message: "Node added successfully",
                node: result
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
        const nodes = await Node.find();
        return res.status(200).json({
            message: "All nodes fetched successfully",
            nodes
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
        const filtered_nodes = await Node.find({"data.course_id": { $in: courseIDsArray }})
        return res.status(200).json({
            message: "All custom nodes fetched successfully",
            filtered_nodes
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

        await Node.findByIdAndUpdate(id, { position }).then((result) => {
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