const normalizr = require('normalizr');
const schema = normalizr.schema;
const normalize = normalizr.normalize;
const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'idEmail' });
const messageSchema = new schema.Entity(
	'messages',
	{
		author: authorSchema,
	},
	{ idAttribute: '_id' }
);
const messageList = [messageSchema];

const normalizeChat = (chat) => {
	const chatToNormalize = chat.map((msg) => ({
		socketid: msg.socketid,
		date: msg.date,
		author: msg.author,
		text: msg.text,
		_id: msg['_id'],
		__v: msg['__v'],
	}));
	const normalized = normalize(chatToNormalize, messageList);
	return normalized;
};

module.exports = { normalizeChat };
