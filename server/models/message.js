var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
	text: String,
	author: {
		username: String,
		id: String
	},
	channel: String,
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Message', messageSchema);