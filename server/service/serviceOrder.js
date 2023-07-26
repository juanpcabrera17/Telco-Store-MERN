const DAO = require('../models/abstractFactory');

const getOrder = async (userId) => {
	let order = await DAO.order.getByUserId(userId);
	return order;
};

const saveOrder = async (order) => {
	let newOrder = await DAO.order.save(order);
	return newOrder;
};

module.exports = {
	getOrder,
	saveOrder,
};
