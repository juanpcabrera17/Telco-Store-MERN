const DAO = require('../models/abstractFactory');

const saveOrder = async (order) => {
	let newOrder = await DAO.order.save(order);
	return newOrder;
};

module.exports = {
	saveOrder,
};
