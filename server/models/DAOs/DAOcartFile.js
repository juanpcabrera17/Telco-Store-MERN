const fs = require('fs');
const { loggerError, loggerWarn } = require('../../config/configWinston');

class containerFile {
	constructor() {
		if (containerFile._instance) {
			return containerFile._instance;
		}
		containerFile._instance = this;
		this.route = './database/cart.json';
	}

	getAll = async () => {
		try {
			const res = JSON.parse(await fs.promises.readFile(this.route, 'utf-8'));
			return res;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	save = async (Object) => {
		try {
			let objs = await this.getAll();
			const currentDate = new Date(Date.now()).toLocaleString();
			Object.timestamp = currentDate;
			let id = 0;
			if (objs.length === 0) {
				id = 0;
			} else {
				id = objs[objs.length - 1].id + 1;
			}
			Object.id = id;
			objs = [...objs, Object];

			await fs.promises.writeFile(this.route, JSON.stringify(objs, null));
			return objs;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	getById = async (username) => {
		try {
			let objs = await this.getAll();
			let foundObject = objs.find((item) => item.id == username);
			if (!foundObject) {
				loggerWarn.info(null);
			} else {
				let object = objs.filter((item) => item.id == username);
				return object;
			}
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	deleteById = async (Number) => {
		try {
			let objs = await this.getAll();
			let object = objs.filter((item) => item.id != Number);
			await fs.promises.writeFile(this.route, JSON.stringify(object, null));
			loggerWarn.info(`el object ${Number} fue eliminado`);
			return object;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	deleteAll = async () => {
		try {
			await fs.promises.writeFile(this.route, JSON.stringify([], null));
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	findIndex = async (Number) => {
		try {
			let products = await this.getAll();
			let foundIndex = products.findIndex((item) => item.id == Number);
			if (foundIndex >= 0) {
				return foundIndex;
			} else {
				loggerWarn.info(null);
			}
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	replace = async (Number, body) => {
		try {
			let objs = await this.getAll();
			const currentDate = new Date(Date.now()).toLocaleString();
			body.timestamp = currentDate;
			body.id = Number;
			objs[Number] = body;

			await fs.promises.writeFile(this.route, JSON.stringify(objs, null));
			return objs;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	saveProduct = async (username, Object) => {
		try {
			let cart = await this.getAll();
			let currentCart = await this.getById(username);

			const currentDate = new Date(Date.now()).toLocaleString();
			Object.timestamp = currentDate;
			let id = 0;
			if (currentCart) {
				if (currentCart[0].products.length === 0) {
					id = 0;
				} else {
					id = currentCart[0].products.length;
				}
				Object._id = id;
				currentCart[0].products.push(Object);
				const oldCart = cart.filter((obj) => obj.id !== username);
				cart = [...oldCart, ...currentCart];
			} else {
				let newCart = [
					{
						products: [],
						timestamp: currentDate,
						id: username,
					},
				];
				Object._id = 0;
				newCart[0].products.push(Object);
				if (JSON.stringify(cart) == '[]') {
					cart = newCart;
				} else {
					cart.push(newCart);
				}
			}
			await fs.promises.writeFile(this.route, JSON.stringify(cart, null));
			return cart;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	deleteProductById = async (username, productId) => {
		try {
			let cart = await this.getAll();
			let id = JSON.parse(productId);

			cart = cart.map((item) => {
				if (item.id === username) {
					item.products = item.products.filter((prod) => prod._id !== id);
				}
				return item;
			});
			await fs.promises.writeFile(this.route, JSON.stringify(cart, null));
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};
}

module.exports = containerFile;
