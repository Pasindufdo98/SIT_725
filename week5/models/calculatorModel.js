const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://fpasindu:7mwJk6VCJkgee90t@cluster0.t3euju3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let collection;

async function dbConnection() {
    try {
        await client.connect();
        collection = client.db("MyCal").collection('CalData');
        console.log("Database connected:", collection);
    } catch (ex) {
        console.error("Error connecting to the database:", ex);
    }
}

function postData(dat, callback) {
    collection.insertOne(dat, callback);
}

function getAllData(callback) {
    collection.find({}).toArray(callback);
}

module.exports = {
    dbConnection,
    postData,
    getAllData
};
