const { saveOrder } = require('../service/serviceOrder');

const controllerPostOrder = async (req, res) => {
	const newOrder = await saveOrder(req.body);
	if (newOrder) {
		res.status(201).json(newOrder);
	} else {
		res.json({ error: true });
	}
};

module.exports = {
	controllerPostOrder,
};
