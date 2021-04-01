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
const users = require('/api/users');
app.use('/api/users', users);

// API Implementation
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../build'))
})

// Port and Listen
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

/*
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_DB_URI || 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.lqxqp.mongodb.net/admin?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("sample_training").collection("zips");

  // perform actions on the collection object
  console.log(collection.findOne());
  
  client.close();
});
*/