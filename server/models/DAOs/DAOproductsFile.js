const fs = require('fs');
const { loggerError, loggerWarn } = require('../../config/configWinston');

class fileContainer {
	constructor() {
		if (fileContainer._instance) {
			return fileContainer._instance;
		}
		fileContainer._instance = this;
		this.route = './database/products.json';
	}

	getAll = async () => {
		try {
			const res = await JSON.parse(await fs.promises.readFile(this.route, 'utf-8'));
			return res;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	save = async (Object) => {
		try {
			let objs = await this.getAll();
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

	getById = async (Number) => {
		try {
			let objs = await this.getAll();
			let foundObject = objs.find((item) => item.id == Number);
			if (!foundObject) {
				loggerWarn.info(null);
			} else {
				let object = objs.filter((item) => item.id == Number);
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

	saveProduct = async (username, body) => {
		try {
			let cart = await this.getAll();
			let cartId = username;
			const currentDate = new Date(Date.now()).toLocaleString();
			body.timestamp = currentDate;
			let id = 0;
			if (cart[cartId].products.length === 0) {
				id = 0;
			} else {
				id = cart[cartId].products[cart[cartId].products.length - 1].id + 1;
			}
			body.id = id;
			cart[cartId].products.push(body);

			await fs.promises.writeFile(this.route, JSON.stringify(cart, null));
			return cart;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	deleteProductById = async (Number1, Number2) => {
		try {
			let cart = await this.getAll();
			let object = cart[Number1].products.filter((item) => item.id != Number2);
			cart[Number1].products = object;

			await fs.promises.writeFile(this.route, JSON.stringify(cart, null));
			loggerWarn.info(`el producto ${Number2} del carrito ${Number1} fue eliminado`);
			return object;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	getByCategory = async (category) => {
		try {
			let products = await this.getAll();
			return products.filter((products) => products.category === category);
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};
}

module.exports = fileContainer;
