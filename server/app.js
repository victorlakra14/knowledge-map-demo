const express = require('express');
const { dbConn } = require('./config/db');
const nodeRouter = require("./routes/node");
const edgeRouter = require("./routes/edge");
const cors = require("cors");

const app = express();

const port = 4000;
app.use(cors())
app.use(express.json());
app.use("/node", nodeRouter);
app.use("/edge", edgeRouter);

dbConn();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// add edges and try the integration with frontend