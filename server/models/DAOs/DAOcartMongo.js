const { Schema, model } = require('mongoose');
const { loggerWarn, loggerError } = require('../../config/configWinston');

const cartsSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		products: [
			{
				productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
				name: { type: String, required: true },
				price: { type: Number, required: true },
				thumbnail: { type: String, required: true },
				category: { type: String, required: true },
				quantity: { type: Number, required: true },
			},
		],
	},
	{ timestamps: true }
);

const cartMongoDB = model('carts', cartsSchema);

class cartContainer {
	constructor() {
		if (cartContainer._instance) {
			return cartContainer._instance;
		}
		cartContainer._instance = this;
		this.cartMongoDB = cartMongoDB;
	}

	getAll = async () => {
		try {
			const res = await this.cartMongoDB.find({});
			return res;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	getById = async (id) => {
		try {
			const obj = await this.cartMongoDB.find({ id: id }).lean();
			return obj;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	save = async (Object) => {
		try {
			const insertObject = new this.cartMongoDB({ ...Object });
			const savedObject = await insertObject.save();
			return savedObject;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	update = async (UserId, Object) => {
		try {
			const updatedCart = await this.cartMongoDB.findOneAndUpdate(
				{ userId: UserId },
				Object,
				{ new: true }
			);
			return updatedCart;
		} catch (err) {
			loggerError.error(`error ${err}`);
		}
	};

	delete = async (UserId) => {
		try {
			const obj = await this.cartMongoDB.findOneAndDelete({ userId: UserId });
			return obj;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	deleteAll = async () => {
		try {
			await this.collection.deleteAll({});
			loggerWarn.info('todos los objetos fueron eliminados');
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	findIndex = async (Number) => {
		try {
			return Number;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	replace = async (Number, Body) => {
		try {
			const currentDate = new Date(Date.now()).toLocaleString();
			Body.timestamp = currentDate;
			await this.schema.updateOne({ _id: Number }, { $set: Body });

			const newObj = await this.schema.find({ _id: Number }).limit(1);
			return newObj;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	saveProduct = async (username, Body) => {
		try {
			const currentDate = new Date(Date.now()).toLocaleString();

			const cart = await this.cartMongoDB.findOne({ id: username });
			const idProducto = Body.productId;
			const nameProducto = Body.name;
			const priceProducto = parseInt(Body.price);
			const thumbnailProducto = Body.thumbnail;
			const quantity = parseInt(Body.quantity);

			if (!cart) {
				const newCart = new this.cartMongoDB({
					id: username,
					products: [
						{
							productId: idProducto,
							name: nameProducto,
							price: priceProducto,
							thumbnail: thumbnailProducto,
							quantity,
						},
					],
					timestamp: currentDate,
				});
				return await newCart.save();
			} else {
				const existingItem = cart.products.find((products) =>
					products.productId.equals(idProducto)
				);
				if (existingItem) {
					existingItem.quantity += quantity;
				} else {
					cart.products.push({
						productId: idProducto,
						name: nameProducto,
						price: priceProducto,
						thumbnail: thumbnailProducto,
						quantity,
					});
				}
				return await cart.save();
			}
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	deleteProductById = async (id, product) => {
		try {
			await this.cartMongoDB.updateOne({ id: id }, { $pull: { products: { _id: product } } });

			loggerWarn.info(`el producto ${product} del carrito ${id} fue eliminado`);
			const newObj = await this.cartMongoDB.find({ id: id });
			return newObj;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};
}

module.exports = cartContainer;
