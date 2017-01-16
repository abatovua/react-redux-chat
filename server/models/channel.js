var mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
	name: {
		type: String,
		unique: true
	},
	owner: {
		username: String,
		id: String
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Channel', channelSchema);