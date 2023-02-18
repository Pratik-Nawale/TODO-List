// below is a syntax for connecting to mongodb without mongodb
const MongoClient = require("mongodb".MongoClient);
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost/codeial";

// Databas name
const dbName = "fruitsDB";

// cerate a new mongo client
const client = new MongoClient(url, { useNewUrlparser: true });

// Use connect method to connect to the server

client.connect(function(err){
    assert.equal(null, err);
    console.log("Connected successfully to database");

    const db = client.db(dbName);

    client.close()
});
