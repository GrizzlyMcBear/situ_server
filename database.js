const mongoose = require('mongoose');
const connection = process.env.MONGO_DB_URI || "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.lqxqp.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
	.then(() => console.log("Database Connected Successfully"))
	.catch(err => console.log(err));
