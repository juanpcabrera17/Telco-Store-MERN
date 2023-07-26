const { Schema, model } = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const { loggerWarn, loggerError } = require('../../config/configWinston');

const orderSchema = new Schema(
	{
		checkout: {
			cart: [
				{
					_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
					name: { type: String, required: true },
					price: { type: Number, required: true },
					thumbnail: { type: String, required: true },
					category: { type: String, required: true },
					quantity: { type: Number, required: true },
					stock: { type: Number, required: true },
				},
			],
			total: { type: Number, required: true },
		},
		user: {
			_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
			firstName: { type: String, required: true, max: 100 },
			lastName: { type: String, required: true, max: 100 },
			email: { type: String, required: true, max: 100 },
			password: { type: String, required: true, max: 100 },
			birthDate: { type: String, required: true, max: 100 },
			country: { type: String, required: true, max: 100 },
			streetAddress: { type: String, required: true, max: 100 },
			city: { type: String, required: true, max: 100 },
			region: { type: String, required: true, max: 100 },
			zipCode: { type: String, required: true, max: 100 },
			isSubscribed: { type: Boolean },
		},
		shippingData: {
			firstName: { type: String, required: true, max: 100 },
			lastName: { type: String, required: true, max: 100 },
			country: { type: String, required: true, max: 100 },
			streetAddress: { type: String, required: true, max: 100 },
			city: { type: String, required: true, max: 100 },
			region: { type: String, required: true, max: 100 },
			zipCode: { type: String, required: true, max: 100 },
			shippingCharge: { type: Number, required: true },
		},
		status: { type: String, required: true, max: 100 },
	},
	{ timestamps: true }
);

orderSchema.plugin(findOrCreate);

const orderMongoDB = model('order', orderSchema);

class orderContainer {
	constructor() {
		if (orderContainer._instance) {
			return orderContainer._instance;
		}
		orderContainer._instance = this;
		this.orderMongoDB = orderMongoDB;
	}

	getByUserId = async (id) => {
		try {
			const orders = await this.orderMongoDB.find({ 'user._id': id }); /* (err, orders)=>{ */
			if (orders.length > 0) {
				return orders;
			}

			//const order = await this.orderMongoDB.findById(id);
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	save = async (Object) => {
		try {
			const insertObject = new this.orderMongoDB({ ...Object });
			const savedObject = await insertObject.save();
			return savedObject;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};
}

module.exports = orderContainer;
