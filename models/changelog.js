const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// todo: check if `Date` is the best representation for `timestamp`
// todo: check if `mongoose` is required at all
const changelogSchema = new Schema({
	details: {
		type: Object,
		required: true
	},
	timestamp: {
		type: Date,
		required: true
	},
	user: {
		type: String,
		required: true
	},
	index: {
		type: Number,
		required: true
	},
	revision: {
		type: Number,
		required: true
	},
	field6: {
		type: Number,
		required: true
	},
	field7: {
		type: Object,
		required: true
	},
	field8: {
		type: Object,
		required: true
	}
});

module.exports = mongoose.model("Changelog", changelogSchema, "changelogs");