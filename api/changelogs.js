const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const Changelog = require('../models/changelog');

// router.get('/', (req, res) => {
// 	Changelog.find()
// 		.then(function (changelogs) {
//             console.log(changelogs);
//             res.json(changelogs);
//         })
// 		.catch(err => console.log(err))
// 	console.log("Inside `router.get` for /api/changelogs");
// });
router.get('/', (req, res) => {

    const uri = process.env.MONGO_DB_URI || 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.lqxqp.mongodb.net/sample_airbnb?retryWrites=true&w=majority';
	
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect to the MongoDB cluster
    client.connect()
        .then(function () {
            // Make the appropriate DB calls
            // await listDatabases(client);
            listDatabases(client)
            .then(function (databasesList) {
                console.log("In router's get method, Databases:");
                databasesList.databases.forEach(db => console.log(` - ${db.name}`));

                res.json(databasesList);
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

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    
    console.log("Databases (in `listDatabases`):");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));

    return databasesList;
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