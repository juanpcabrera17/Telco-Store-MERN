const express = require('express');
const app = express();
const cors = require('cors');
const { engine } = require('express-handlebars');
const { loggerWarn, loggerError } = require('./configWinston');
const { passport } = require('./configAuth');
const session = require('express-session');
const path = require('path');
const compression = require('compression');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
if (process.env.MODE != 'PRODUCTION') {
	require('dotenv').config();
}
const PORT = process.env.PORT;
const MongoDBconnection = process.env.MONGODBCONNECTION;
const DAO = require('../models/abstractFactory');
const chatContainer = DAO.chat;

mongoose
	.connect(MongoDBconnection)
	.then(() => loggerWarn.info('Connected to Mongo'))
	.catch((err) => {
		loggerError.error(err);
		throw 'can not connect to the mongo!';
	});

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: MongoDBconnection,
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
			/* ttl: 60,
			cookie: {
				maxAge: 600000,
			}, */
		}),
		secret: 'secreto',
		resave: false,
		saveUninitialized: false,
	})
);

app.set('view engine', 'hbs');
app.set('views', path.join(process.cwd(), '/views'));
app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		defaultLayout: 'index.hbs',
		layoutsDir: path.join(process.cwd(), 'views/layouts'),
		partialsDir: path.join(process.cwd(), 'views/partials'),
	})
);

/* app.use(
	cors({
		origin: '*',
	})
); */
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5173' }));
app.use(express.static('public', { index: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use((req, res, next) => {
	loggerWarn.info({ metodo: req.method, path: req.path });
	next();
});

module.exports = { app, passport, chatContainer, PORT };
