const { Schema, model } = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema(
	{
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
		favorites: [{ productid: { type: Schema.Types.ObjectId, ref: 'Product' } }],
	},
	{ timestamps: true }
);
userSchema.plugin(findOrCreate);

const userMongoDB = model('users', userSchema);

class userContainer {
	constructor() {
		if (userContainer._instance) {
			return userContainer._instance;
		}
		userContainer._instance = this;
		this.userMongoDB = userMongoDB;
	}

	getAll = async () => {
		try {
			const res = await this.userMongoDB.find({}).lean();
			return res;
		} catch (err) {
			loggerError.error(`error: ${err}`);
		}
	};

	getById = async (id) => {
		try {
			const user = await this.userMongoDB.find({ id: id });
			if (user.length > 0) {
				return user;
			}
		} catch (err) {
			loggerError.error(`error ${err}`);
		}
	};

	update = async (ProductId, Object) => {
		try {
			const updatedUser = await this.userMongoDB.findOneAndUpdate(
				{ _id: ProductId },
				Object,
				{ new: true }
			);
			return updatedUser;
		} catch (err) {
			console.log(`error: ${err}`);
		}
	};

	delete = async (UserId) => {
		try {
			const deletedUser = await this.userMongoDB.findOneAndDelete({ _id: UserId });
			return deletedUser;
		} catch (err) {
			console.log(`error: ${err}`);
		}
	};
}

module.exports = { userContainer, userMongoDB };
