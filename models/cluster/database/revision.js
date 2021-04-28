const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const revisionSchema = new Schema({
    exportLinks: {
        type: Object,
        required: true
    },
	id: {
		type: String,
		required: true
	},
    kind: {
		type: String,
		required: true
	},
	lastModifyingUser: {
		type: Object,
		required: true
	},
	etag: {
		type: String,
		required: true
	},
	lastModifyingUserName: {
		type: String,
		required: true
	},
    selfLink: {
		type: String,
		required: true
	},
	mimeType: {
		type: String,
		required: true
	},
	published: {
		type: Boolean,
		required: true
	},
    modifiedDate: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Revision", revisionSchema, "revisions");