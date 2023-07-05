const { app, containerChat, PORT } = require('./config/configServer');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const routerUser = require('./router/routesUser');
const routerProducts = require('./router/routesProducts');
const routerCart = require('./router/routesCart');
const { loggerWarn } = require('./config/configWinston');
const generatedProducts = require('./config/configFaker');

httpServer.listen(PORT, () => {
	loggerWarn.info(`Example app listening on port http://localhost:${PORT}/api/usuario/login`);
});

app.use('/api/user', routerUser);
app.use('/api/product', routerProducts);
app.use('/api/cart', routerCart);
app.get('*', (req, res) => {
	loggerWarn.warn({ metodo: req.method, path: req.path });
	res.status(404).send('error 404 not found');
});

io.on('connection', async (socket) => {
	loggerWarn.info(`se conectó el cliente: [${socket.id}]`);

	socket.emit('msg-list', await containerChat.getChat());
	socket.on('msg', async (data) => {
		loggerWarn.info('data', data);
		const currentDate = Date.now();
		const date = new Date(currentDate);
		const formattedDate = date.toLocaleString();

		await containerChat.saveChat({ socketid: socket.id, date: formattedDate, ...data });
		io.emit('msg-list', await containerChat.getChat());
	});

	socket.emit('randomProduct-list', generatedProducts());
});
