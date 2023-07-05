const { Schema, model } = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema(
	{
		idEmail: { type: String, required: true, max: 100 },
		username: { type: String, required: true, max: 100 },
		password: { type: String, required: true, max: 100 },
		name: { type: String, required: true, max: 100 },
		surname: { type: String, required: true, max: 100 },
		age: { type: Number, required: true, max: 999 },
		alias: { type: String, max: 100 },
		phoneNumber: { type: String, required: true, max: 100 },
		avatar: { type: String, required: true },
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
