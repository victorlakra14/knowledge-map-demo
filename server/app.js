const express = require('express');
const { dbConn } = require('./config/db');
const nodeRouter = require("./routes/node");
const edgeRouter = require("./routes/edge");
const courseRouter = require("./routes/course");
const chapterRouter = require("./routes/chapter");
const testNodesRouter = require("./routes/testNodes");
const cors = require("cors");

const app = express();

const port = 4000;
app.use(cors())
app.use(express.json());
app.use("/node", nodeRouter);
app.use("/edge", edgeRouter);
app.use("/course", courseRouter);
app.use("/chapter", chapterRouter);
app.use("/testNodes", testNodesRouter);

dbConn();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})