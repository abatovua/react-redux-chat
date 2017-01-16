const router = require('express').Router();
const Message = require('../models/message');

module.exports = function(io) {
	io.on('connection', (socket) => {
		console.log('From messages', socket.id);
	});

	router.get('/:channelName', (req, res) => {
		const channel = req.params.channelName;

		Message.find({ channel }).exec()
			.then(messages => {
				res.json({ success: true, messages, message: `Successfully loaded messahes for ${channel}` });
			})
			.catch(e => {
				res.json({ success: false, message: 'Internal server error' });
			});
	});

	router.post('/', (req, res) => {
		const { text, author, channel } = req.body;
		const newMessage = new Message({
			text,
			author,
			channel
		});

		newMessage.save()
			.then(message => {
				io.sockets.in(channel).emit('new message', message);
				res.json({ success: true, message: 'Successfully created message' });
			})
			.catch(e => {
				console.log('ERROR: ', e.message);
			});
	});

	return router;
}
