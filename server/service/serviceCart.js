const DAO = require('../models/abstractFactory');
const { purchaseEmail } = require('../config/configNodemailer');
const { purchaseSMS, purchaseWPP } = require('../config/configTwilio');

const getCartById = async (userId) => {
	const object = await DAO.cart.getById(userId);
	return object;
};

const saveCart = async (cart) => {
	let newCart = await DAO.cart.save(cart);
	return newCart;
};

const updateCartById = async (userId, updateData) => {
	let updatedCart = await DAO.cart.update(userId, updateData);
	return updatedCart;
};

const deleteCartById = async (userId) => {
	let deletedCart = await DAO.cart.delete(userId);
	return deletedCart;
};

/* const addTotalCost = (object) => {
	let products = object[0].products;
	let totalCost = 0;
	products = products.map((product) => {
		const productTotal = product.price * product.quantity;
		totalCost += productTotal;
		return {
			id: product._id,
			name: product.name,
			price: product.price,
			thumbnail: product.thumbnail,
			quantity: product.quantity,
			total: productTotal,
		};
	});
	return { products, totalCost };
};

const addTotalQuantity = (products) => {
	let totalQuantity = 0;
	products.forEach((product) => {
		totalQuantity += product.quantity;
	});
	return totalQuantity;
}; */

/* const saveProductInCart = async (username, body) => {
	let carts = await DAO.cart.saveProduct(username, body);
	return carts;
};

const removeProductInCart = async (username, product) => {
	await DAO.cart.deleteProductById(username, product);
}; */

const endPurchase = (products) => {
	const productsMap = products.name.map((value, index) => {
		return {
			name: products.name[index],
			price: products.price[index],
			quantity: products.quantity[index],
			total: products.total[index],
		};
	});
	const productsString = JSON.stringify(productsMap);
	return productsString;
};

const notify = (user, purchase, total) => {
	purchaseEmail(user, purchase, total);
	purchaseSMS(user.phoneNumber);
	purchaseWPP(user);
};

module.exports = {
	getCartById,
	saveCart,
	updateCartById,
	deleteCartById,
	/* addTotalCost,
	addTotalQuantity,
	endPurchase,
	notify, */
};
