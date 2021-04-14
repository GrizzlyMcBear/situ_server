const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// todo: check if `Date` is the best representation for `timestamp`
// todo: check if `mongoose` is required at all
const insightSchema = new Schema({
	document_id: {
		type: String,
		required: true
	},
	stored_info: {
		type: Object,
		required: true
	},
	creation: {
		type: Number,
		required: true
	},
	last_updated: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model("insight", insightSchema, "insights");