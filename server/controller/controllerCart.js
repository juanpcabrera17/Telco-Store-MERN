const { getInfoSignup } = require('../service/serviceUser');
const {
	getCartById,
	saveCart,
	updateCartById,
	deleteCartById,
	addTotalCost,
	addTotalQuantity,
	saveProductInCart,
	removeProductInCart,
	endPurchase,
	notify,
} = require('../service/serviceCart');
const { loggerWarn } = require('../config/configWinston');

const controllerGetCart = async (req, res) => {
	const object = await getCartById(req.params.userId);

	if (object) {
		res.status(200).json(object);
		/* let { products, totalCost } = addTotalCost(object);
		let totalQuantity = addTotalQuantity(products);
		res.status(200).json({
			products,
			totalCost,
			totalQuantity,
		}); */
	} else {
		res.status(500).json({ error: true });
	}
};

const controllerPostCart = async (req, res) => {
	const newCart = await saveCart(req.body);
	if (newCart) {
		res.status(201).json(newCart);
		/* res.status(201).send('producto agregado al carrito');
		loggerWarn.info('producto agregado al carrito'); */
	} else {
		res.json({ error: true });
	}
};

const controllerPutCart = async (req, res) => {
	const updatedCart = await updateCartById(req.params.userId, req.body);
	res.status(201).json(updatedCart);
};

const controllerDeleteCartById = async (req, res) => {
	const product = await deleteCartById(req.params.userId);
	res.status(200).json(product);
};

const controllerPostPurchaseCart = async (req, res) => {
	const user = req.user;
	const products = req.body;
	const total = req.body.totalCost;
	const purchase = endPurchase(products);

	if (purchase) {
		/* notify(user, purchase, total); */
		res.status(200).send('muchas gracias por su compra!');
	} else {
		res.json({ error: true });
	}
};

module.exports = {
	controllerGetCart,
	controllerPostCart,
	controllerPutCart,
	controllerDeleteCartById,
	/* controllerPostPurchaseCart, */
};
