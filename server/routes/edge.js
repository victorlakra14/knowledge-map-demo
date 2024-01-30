const express = require("express")
const { Edge } = require("../models/Edge")

const router = express.Router();

router.post("/add", async (req, res) => {
    try {

        const edge = new Edge(req.body);
        await edge.save().then((result) => {
            return res.status(200).json({
                message: "Edge added successfully",
                edge: result
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
        const edges = await Edge.find();
        return res.status(200).json({
            message: "All edges fetched successfully",
            edges
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Edge.findByIdAndDelete(id).then((result) => {
            return res.status(200).json({
                message: "Edge deleted successfully",
                edge: result
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