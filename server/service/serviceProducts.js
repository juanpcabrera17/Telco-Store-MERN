const DAO = require('../models/abstractFactory');

const getProducts = async () => {
	let products = await DAO.product.getAll();
	if (products.length === 0) {
		products = false;
	}
	return products;
};

const postProduct = async (product) => {
	let newProduct = await DAO.product.save(product);
	return newProduct;
};

const getProductById = async (productId) => {
	let product = await DAO.product.getById(productId);
	return product;
};

const getProductsByCategory = async (category) => {
	let products = await DAO.product.getByCategory(category);
	if (products.length === 0) {
		products = false;
	}
	return products;
};

const updateProductById = async (productId, updateData) => {
	let updatedProduct = await DAO.product.update(productId, updateData);
	return updatedProduct;
};

const deleteProductById = async (productId) => {
	let deletedProduct = await DAO.product.delete(productId);
	return deletedProduct;
};

module.exports = {
	getProducts,
	postProduct,
	getProductById,
	getProductsByCategory,
	deleteProductById,
	updateProductById,
};
