const mongoose = require('mongoose');
const connection = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.lqxqp.mongodb.net/admin?retryWrites=true&w=majority";
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
	.then(() => console.log("Database Connected Successfully"))
	.catch(err => console.log(err));
