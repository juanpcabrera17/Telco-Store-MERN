const { createTransport } = require('nodemailer');
const { loggerError, loggerWarn } = require('./configWinston');

if (process.env.MODE != 'PRODUCTION') {
	require('dotenv').config();
}

const registerEmail = async (user) => {
	const transporter = createTransport({
		service: 'gmail',
		port: 587,
		auth: {
			user: 'juanpic17@gmail.com',
			pass: process.env.NODEMAILER,
		},
	});

	const mailOptions = {
		from: 'Servidor Node JS',
		to: 'juanpic17@gmail.com',
		subject: 'nuevo registro',
		html: `<div>
					<img src='${user.avatar}' alt='avatar' style="width:50% ; object-fit:contain"/>
					<h5 style='font-weight: "bold"; font-size: "10px"'>${user.name} ${user.surname}</h5>
					<ul>
						<li>Email: ${user.idEmail}</li>
						<li>Nombre de usuario: ${user.username}}</li>
						<li>Edad: ${user.age}}</li>
						<li>Alias: ${user.alias}}</li>
						<li>Número de teléfono: ${user.phoneNumber}}</li>
					</ul>
				</div>`,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		loggerWarn.info(info);
	} catch (err) {
		loggerError.error(`error: ${err}`);
	}
};

const purchaseEmail = async (user, products, total) => {
	const transporter = createTransport({
		service: 'gmail',
		port: 587,
		auth: {
			user: 'juanpic17@gmail.com',
			pass: process.env.NODEMAILER,
		},
	});

	const mailOptions = {
		from: 'Servidor Node JS',
		to: 'juanpic17@gmail.com',
		subject: `nuevo pedido de ${user.name} ${user.idEmail}`,
		html: `<div>
					<h2 style='font-weight: "bold"; font-size: "10px"'>Lista de productos</h5>
					<div>
						<p>${products}</p>
						<p>Total: $${total}</p>
					</div>
				</div>`,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		loggerWarn.info(info);
	} catch (err) {
		loggerError.error(`error: ${err}`);
	}
};

module.exports = { registerEmail, purchaseEmail };
