// Simple nodejs app to connect to mongodb and insert a document
// Usage: node mongo_victor.js

const MongoClient = require('mongodb').MongoClient;
const XLSX = require('xlsx');

const connectionUrl = "mongodb+srv://vickylakra10:vickylakra10@cluster0.mzdjw2k.mongodb.net/knowledge-db?retryWrites=true&w=majority";
const databaseName = "knowledge-db";
const collectionName = "tests";
const xlsxFile = "./resources/khan_questions1.xlsx";

console.log("Connecting to mongodb");

const client = new MongoClient(connectionUrl);
const file = XLSX.readFile(xlsxFile);
const sheet = file.Sheets[file.SheetNames[0]];

async function run() {
    try {
        await client.connect();
        console.log("Connected to mongodb");
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        const data = XLSX.utils.sheet_to_json(sheet);
        var lastExerciseId = 0;
        dataToInsert = [];
        await data.forEach((element, index) => {
            if (element.exercise_id != lastExerciseId) {
                lastExerciseId = element.exercise_id;
                temp = {
                    id: element.exercise_id,
                    data: {
                        label: element.exercise,
                        course_id: element.course_id,
                        course: element.course,
                        chapter_id: element.chapter_id,
                        chapter: element.chapter,
                        exercise_id: element.exercise_id,
                        exercise_name: element.exercise
                    },
                    position:{
                        x: Math.random() * 1000,
                        y: Math.random() * 1000
                    },
                    type: "topicNode"
                }
                dataToInsert.push(temp);
            }
        }
        );
        console.log(dataToInsert);
        await collection.insertMany(dataToInsert).then((result) => {
            console.log(`Successfully inserted ${result.insertedCount} items!`);
            console.log("Closing connection to mongodb");
            client.close();
        }
        );

    }
    catch (e) {
        console.log(50);
        console.error(e);
    }
}

run().catch(console.dir);
console.log("Done");
