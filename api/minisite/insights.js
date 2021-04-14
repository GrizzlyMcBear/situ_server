const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const Changelog = require('../../models/minisite/insight');

router.get('/', (req, res) => {

    const uri = process.env.MONGO_DB_URI || 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.lqxqp.mongodb.net/situ_data?retryWrites=true&w=majority';
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    let docId = req.body.docId;

    console.log('docId = ' + docId);
    // '1kbPYcn8CTzfxD4JUfG6OZhuAirLZYgKhT1NV6GHXwd8'
    
    // Connect to the MongoDB cluster
    client.connect()
        .then(function () {
            // Make the appropriate DB calls
            // await listDatabases(client);
            getMinisiteData(client, docId)
            .then(function (data) {
                res.json(data);
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

async function getMinisiteData(client, docId){
    let database = client.db('situ_data') || null;
    let collection = database.collection('minisite_data') || null;

    if (!database || !collection)
        return [];

    let query = {
        'document_id': docId
    };
    let options = {
        'last_updated': -1
    };

    let data = await collection.findOne(query, options);
    
    return data;
};

router.post('/', (req, res) => {
    const { details, timestamp, user, index, revision, field6, field7, field8 } = req.body;
	const newChangelog = new Changelog({
		details: details, timestamp: timestamp, user: user, index: index, revision: revision, field6: field6, field7: field7, field8: field8
	})
	newChangelog.save()
		.then(() => res.json({
			message: "Created changelog successfully"
		}))
		.catch(err => res.status(400).json({
			"error": err,
			"message": "Error creating changelog"
		}))
});

module.exports = router;