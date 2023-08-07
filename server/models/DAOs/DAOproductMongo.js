const { Schema, model } = require('mongoose');
const { loggerError } = require('../../config/configWinston');

const productSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		stock: { type: Number, required: true },
		thumbnail: { type: String, required: true },
		category: { type: String, required: true },
		description: { type: String, required: true },
	},
	{ timestamps: true }
);

const productMongoDB = model('products', productSchema);

class productContainer {
	constructor() {
		if (productContainer._instance) {
			return productContainer._instance;
		}
		productContainer._instance = this;
		this.productMongoDB = productMongoDB;
	}

	getAll = async () => {
		try {
			const res = await this.productMongoDB.find({}).lean();
			return res;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	save = async (Object) => {
		try {
			const insertObject = new this.productMongoDB({ ...Object });
			const savedObject = await insertObject.save();
			return savedObject;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	getById = async (id) => {
		try {
			const products = await this.productMongoDB.find({ _id: id });
			if (products.length > 0) {
				return products;
			}
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	getByCategory = async (Category) => {
		try {
			let products = await this.getAll();
			return products.filter((products) => products.category === Category);
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	update = async (ProductId, Object) => {
		try {
			const updatedProduct = await this.productMongoDB.findOneAndUpdate(
				{ _id: ProductId },
				Object,
				{ new: true }
			);
			return updatedProduct;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	delete = async (ProductId) => {
		try {
			const deletedProduct = await this.productMongoDB.findOneAndDelete({ _id: ProductId });
			return deletedProduct;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};
}

module.exports = productContainer;
