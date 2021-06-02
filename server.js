const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
require('./database');

app.use(express.static(path.join(__dirname, 'public')))
	.use(bodyParser.json())
	.use(cors())
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('pages/index'));

// API Definition
const users = require('./api/users');
app.use('/api/users', users);

const changelogs = require('./api/changelogs');
app.use('/api/changelogs', changelogs);

const revisions = require('./api/cluster/database/revisions');
app.use('/api/cluster/database/revisions', revisions);

const insights = require('./api/minisite/insights');
app.use('/api/minisite/insights', insights);

// API Implementation
// app.use(express.static(path.join(__dirname, '../build')))
// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../build'))
// })

// Port and Listen
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// MongoDB official documentation
const MongoClient = require('mongodb').MongoClient;

async function main() {
	/**
	 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
	 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
	 */
	const uri = process.env.MONGO_DB_URI || 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.lqxqp.mongodb.net/sample_airbnb?retryWrites=true&w=majority';
	
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

	try	{
		// Connect to the MongoDB cluster
		await client.connect();
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

main().catch(console.error);

async function createListing(client, newListing){
    const result = await client.db("situ_data").collection("changelogs").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}