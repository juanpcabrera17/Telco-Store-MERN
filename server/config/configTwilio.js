const twilio = require('twilio');
const { loggerWarn, loggerError } = require('./configWinston');

if (process.env.MODE != 'PRODUCTION') {
	require('dotenv').config();
}

const accountSid = 'AC2f96b5619c79ac5236e8ac497d70328d';
const authToken = process.env.TWILIO;
const client = twilio(accountSid, authToken);

const purchaseSMS = async (phoneNumber) => {
	try {
		const message = await client.messages.create({
			body: 'Su pedido ha sido recibido y se encuentra en proceso ',
			messagingServiceSid: 'MGd12d505aa4ad28f2b1ebacaba38a1a79',
			to: phoneNumber,
		});
		loggerWarn.info(message);
	} catch (error) {
		loggerError.error(error);
	}
};
const purchaseWPP = async (user) => {
	const message = await client.messages.create({
		body: `Nuevo pedido de ${user.name} ${user.idEmail}`,
		from: 'whatsapp:+14155238886',
		to: 'whatsapp:+5493442509099',
	});
	loggerWarn.info(message);
};
module.exports = { purchaseSMS, purchaseWPP };
