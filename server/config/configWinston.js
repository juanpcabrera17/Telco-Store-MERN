const winston = require('winston');

const loggerWarn = winston.createLogger({
	level: 'info',
	transports: [
		new winston.transports.Console({ level: 'info' }),
		new winston.transports.File({ filename: './logs/warn.log', level: 'warn' }),
	],
});

const loggerError = winston.createLogger({
	level: 'error',
	transports: [
		new winston.transports.Console({ level: 'error' }),
		new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
	],
});

module.exports = { loggerWarn, loggerError };
