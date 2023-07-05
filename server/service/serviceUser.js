const DAO = require('../models/abstractFactory');

const getUsers = async () => {
	let users = await DAO.user.getAll();
	return users;
};

const getUserById = async (userId) => {
	let user = await DAO.user.getById(userId);
	return user;
};

const updateUserById = async (userId, updateData) => {
	let updatedUser = await DAO.user.update(userId, updateData);
	return updatedUser;
};

const deleteUserById = async (userId) => {
	let deletedUser = await DAO.user.delete(userId);
	return deletedUser;
};

/* const getInfoUser = (req) => {
	const { username, password } = req;
	const user = { username, password };
	return user;
};

const getInfoSignup = (req) => {
	const { idEmail, username, password, name, surname, age, alias, phoneNumber, avatar } = req;
	const user = {
		idEmail,
		username,
		password,
		name,
		surname,
		age,
		alias,
		phoneNumber,
		avatar,
	};
	return user;
};

const getAllData = () => {
	const data = {
		os: process.platform,
		version: process.version,
		memory: process.memoryUsage().rss,
		path: process.execPath,
		id: process.pid,
		folder: process.cwd(),
		cpus: os.cpus().length,
	};
	return data;
}; */

module.exports = {
	getUsers,
	getUserById,
	updateUserById,
	deleteUserById /* getInfoUser, getInfoSignup, getAllData */,
};
