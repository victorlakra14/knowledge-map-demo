const express = require('express');
const { dbConn } = require('./config/db');
const nodeRouter = require("./routes/node");
const edgeRouter = require("./routes/edge");
const courseRouter = require("./routes/course");
const cors = require("cors");

const app = express();

const port = 4000;
app.use(cors())
app.use(express.json());
app.use("/node", nodeRouter);
app.use("/edge", edgeRouter);
app.use("/course", courseRouter);

dbConn();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})