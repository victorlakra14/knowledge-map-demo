const mongoose = require("mongoose");

exports.dbConn = () => {
    const dbURL = "mongodb+srv://vickylakra10:vickylakra10@cluster0.mzdjw2k.mongodb.net/knowledge-db?retryWrites=true&w=majority";
    mongoose.connect(dbURL).then(() => {
        console.log("Connected to Database");
    }).catch((err) => {
        console.log("Error connecting to Data", err.message);
    })
}