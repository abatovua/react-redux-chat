const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const socketIO = require('socket.io');

const port = process.env.PORT || 8000;
const config = require('./config/config');

mongoose.Promise = global.Promise;
mongoose.connect(config.db);

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//routes
const authRoutes = require('./routes/auth');
const channelRoutes = require('./routes/channels')(io);
const messageRoutes = require('./routes/messages')(io);

app.use('/auth', authRoutes);
app.use('/channels', channelRoutes);
app.use('/messages', messageRoutes);

app.get('/', (req, res) => {
	res.send('It works!');
});

server.listen(port, () => {
	console.log(`Api is running on port ${port}`);
});