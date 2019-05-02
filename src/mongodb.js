const {MongoClient, ObjectID} = require('mongodb');
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = 'burger-builder';

const id = new ObjectID();
MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true},
    (err, client) => {
        if(err) {
            return console.log("unabled to connect to database");
        }
        const db = client.db(databaseName);
    }
);