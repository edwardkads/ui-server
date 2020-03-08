const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const imagesCollection = 'images';

const dbName = 'diagrams';

// Create a new MongoClient
const client = new MongoClient(url);

const db

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client.db(dbName);

    client.close();
});

const PORT = 3000;

var app = express();

app.use(bodyParser.json()).use(cors());

app.get('/:token', (req, res) => {
    const { token } = req.params;
    if (!token) res.status(400).json({ error: "Invalid token" })
    // const imgCollection = db.collection(imagesCollection);
    // imgCollection.find({})
    res.status(200).json({ data: { token: token } });
});

app.post('/:token/:writeToken', (req, res) => {
    const { token, writeToken } = req.params;
    if (!token || !writeToken) return res.status(400).json({ error: "Invalid req parameters" });
    return res.status(201).json({ data: { token: token, writeToken: writeToken } });
});

app.put('/:token/:writeToken', (req, res) => {
    const { token, writeToken } = req.params;
    if (!token || !writeToken) return res.status(400).json({ error: "Invalid req parameters" });
    return res.status(201).json({ data: { token: token, writeToken: writeToken } });
});

app.listen(PORT);