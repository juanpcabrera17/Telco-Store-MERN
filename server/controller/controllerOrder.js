const { getOrder, saveOrder } = require('../service/serviceOrder');
const { updateProductById } = require('../service/serviceProducts');

const controllerGetOrder = async (req, res) => {
	const orders = await getOrder(req.params.userId);
	if (orders) {
		res.status(200).json({ orders });
	} else {
		res.status(200).json({ error: 'you have no orders' });
	}
};

const controllerPostOrder = async (req, res) => {
	const newOrder = await saveOrder(req.body);
	if (newOrder) {
		req.body.checkout.cart.map(async (product) => {
			await updateProductById(product._id, {
				stock: product.stock - product.quantity,
			});
		});
		res.status(201).json(newOrder);
	} else {
		res.json({ error: true });
	}
};

module.exports = {
	controllerGetOrder,
	controllerPostOrder,
};
