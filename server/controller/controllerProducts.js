const { getInfoSignup } = require('../service/serviceUser');
const {
	getProducts,
	postProduct,
	getProductsByCategory,
	deleteProductById,
	updateProductById,
	getProductById,
} = require('../service/serviceProducts');

const controllerGetProducts = async (req, res) => {
	/* const user = getInfoSignup(req.user); */
	const { category } = req.query;
	let products = [];
	if (category) {
		products = await getProductsByCategory(category);
	} else {
		products = await getProducts();
	}
	let productsExist = false;
	if (products) {
		productsExist = true;
	}
	res.status(200).json({
		/* idEmail: user.idEmail,
		username: user.username,
		name: user.name,
		surname: user.surname,
		age: user.age,
		alias: user.alias,
		phoneNumber: user.phoneNumber,
		avatar: user.avatar, */
		productsExist,
		products,
		/* layout: 'socketClient', */
	});
};

const controllerPostProduct = async (req, res) => {
	const newProduct = await postProduct(req.body);
	if (newProduct) {
		res.status(201).send('product added successfully!');
	} else {
		res.send('error');
	}
};

const controllerGetProductById = async (req, res) => {
	const product = await getProductById(req.params.productId);
	res.status(200).json({ product });
};

const controllerPutProductById = async (req, res) => {
	const updatedProduct = await updateProductById(req.params.productId, req.body);
	res.status(201).json(updatedProduct);
};

const controllerDeleteProductById = async (req, res) => {
	const product = await deleteProductById(req.params.productId);
	res.status(200).json(product);
};

/* const controllerGetProductsTest = (req, res) => {
	res.render('randomProducts', { layout: false });
}; */

module.exports = {
	controllerGetProducts,
	controllerPostProduct,
	controllerGetProductById,
	controllerDeleteProductById,
	controllerPutProductById,

	/* controllerGetProductsTest ,*/
};
