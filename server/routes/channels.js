const router = require('express').Router();
const Channel = require('../models/channel');

module.exports = function(io) {
	io.on('connection', (socket) => {
		console.log('From channels', socket.id);

		socket.on('join channel', (channel) => {
			socket.join(channel.name);
		});

		socket.on('leave channel', (channel) => {
			socket.leave(channel.name);
		});

	});

	router.get('/', (req, res) => {
		Channel.find({}).exec()
			.then(channels => {
				res.json({
					success: true,
					channels,
					message: 'Fetching channels success'
				});
			})
			.catch(e => {
				res.json({
					success: false,
					message: 'Internal server error. Try later.'
				})
			})
	});

	router.post('/create', (req, res) => {
		const { name, owner } = req.body;

		const newChannel = new Channel({
			name,
			owner
		});

		newChannel.save()
			.then(channel => {
				io.emit('new channel', channel);
				res.json({ success: true, message: 'Channel successfully created' });
			})
			.catch(e => {
				res.json({
					success: false,
					message: 'Channel with this name is already exists'
				});
			});
	});

	return router;

}