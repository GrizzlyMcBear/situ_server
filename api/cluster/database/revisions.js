const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const Revision = require('../../../models/cluster/database/revision');

const DBName = 'situ_data';
const uri = process.env.MONGO_DB_URI || `mongodb+srv://m001-student:m001-mongodb-basics@sandbox.lqxqp.mongodb.net/${DBName}?retryWrites=true&w=majority`;

router.get('/', (req, res) => {

    let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect to the MongoDB cluster
    client.connect()
        .then(function () {
            getCollections(client)
            .then(function (collections) {
                return collections;
            })
            .catch(err => console.error(err))
            .finally(function () {
                console.log("[revisions:GET] Closing client...");
                client.close().then(function () {}).catch(function () {});
                console.log("[revisions:GET] Closed client!");
            });
        })
        .catch(error => console.error(error));
});

async function getCollections(client){
    collections = await client.db('situ_data').collections();
    
    // console.log(`Collections (DB ${DBName}):`);
    // collections.forEach(collection => console.log(` - ${collection.collectionName}`));

    return collections;
};

router.post('/', (req, res) => {

    let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log("[revisions:POST] req.body");
    console.dir(req.body);

    const { exportLinks, id, kind, lastModifyingUser, etag, lastModifyingUserName, selfLink, mimeType, published, modifiedDate } = req.body;
	const newRevision = new Revision({
		exportLinks: exportLinks, id: id, kind: kind, lastModifyingUser: lastModifyingUser, etag: etag, lastModifyingUserName: lastModifyingUserName,
        selfLink: selfLink, mimeType: mimeType, published: published, modifiedDate: modifiedDate
	});

    client.connect()
        .then(function () {
            updateRevision(client, newRevision)
            .then(function (result) {
                return result;
            })
            .catch(err => console.error(err))
            .finally(function () {
                console.log("[revisions:POST] Closing client...");
                client.close().then(function () {}).catch(function () {});
                console.log("[revisions:POST] Closed client!");
            });
        })
        .catch(error => console.error(error));
});

async function updateRevision(client, revision) {
    console.log('Updated revision:');
    console.log(revision);
    console.log('\n');

    const result = await client.db("situ_data").collection("revisions").insertOne(revision);
    console.log(`Updated revision successfully with the following id: ${result.insertedId}`);

    return result;
}

module.exports = router;