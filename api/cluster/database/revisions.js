const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const Revision = require('../../../models/cluster/database/revision');

const DBName = 'situ_data';

router.get('/', (req, res) => {

    const uri = process.env.MONGO_DB_URI || `mongodb+srv://m001-student:m001-mongodb-basics@sandbox.lqxqp.mongodb.net/${DBName}?retryWrites=true&w=majority`;
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect to the MongoDB cluster
    client.connect()
        .then(function () {
            getCollections(client)
            .then(function (collections) {
                res.json(collections);
            })
            .catch(err => console.error(err))
            .finally(function () {
                console.log("Closing client...");
                client.close().then(function () {}).catch(function () {});
                console.log("Closed client!");
            });
        })
        .catch(error => console.error(error));
});

async function getCollections(client){
    collections = await client.db('situ_data').collections();
    
    console.log(`Collections (DB ${DBName}):`);
    collections.forEach(collection => console.log(` - ${collection.collectionName}`));

    return collections;
};

router.post('/', (req, res) => {
    const { exportLinks, id, kind, lastModifyingUser, etag, lastModifyingUserName, selfLink, mimeType, published, modifiedDate } = req.body;
	const newRevision = new Revision({
		exportLinks: exportLinks, id: id, kind: kind, lastModifyingUser: lastModifyingUser, etag: etag, lastModifyingUserName: lastModifyingUserName,
        selfLink: selfLink, mimeType: mimeType, published: published, modifiedDate: modifiedDate
	})
	newRevision.save()
		.then(() => res.json({
			message: "Created revision successfully"
		}))
		.catch(err => res.status(400).json({
			"error": err,
			"message": "Error creating revision"
		}))
});

module.exports = router;