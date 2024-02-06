const express = require("express")
const {Chapter} = require("../models/Chapter")

const router = express.Router();

router.post("/add", async (req, res) => {
    try {

        const chapter = new Chapter(req.body);
        await chapter.save().then((result) => {
            return res.status(200).json({
                message: "Chapter added successfully",
                chapter: result
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
        const chapters = await Chapter.find();
        return res.status(200).json({
            message: "All chapters fetched successfully",
            chapters
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})

module.exports = router;