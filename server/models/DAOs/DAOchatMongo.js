const { Schema, model } = require('mongoose');
const normalizr = require('../../config/configNormalizr');
const { loggerError } = require('../../config/configWinston');

const chatSchema = new Schema({
	socketid: { type: String, required: true, max: 100 },
	date: { type: String, required: true, max: 100 },
	author: {
		idEmail: { type: String, required: true, max: 100 },
		name: { type: String, required: true, max: 100 },
		surname: { type: String, required: true, max: 100 },
		age: { type: Number, required: true, max: 100 },
		alias: { type: String, required: true, max: 100 },
		avatar: { type: String, required: true },
	},
	text: { type: String, required: true },
});

const chatMongoDB = model('chat', chatSchema);

class chatContainer {
	constructor() {
		if (chatContainer._instance) {
			return chatContainer._instance;
		}
		chatContainer._instance = this;
		this.chatMongoDB = chatMongoDB;
	}

	getChat = async () => {
		try {
			const res = await this.chatMongoDB.find({});
			const normalized = normalizr.normalizeChat(res);
			return normalized;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	saveChat = async (Object) => {
		try {
			const insertObject = new this.chatMongoDB({ ...Object });
			const savedObject = await insertObject.save();
			return savedObject;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};
}

module.exports = chatContainer;
