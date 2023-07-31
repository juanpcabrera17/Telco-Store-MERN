const { Router } = require('express');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../config/configAuth');
const {
	controllerGetProducts,
	controllerGetProductsByCategory,
	controllerPostProduct,
	controllerDeleteProductById,
	controllerPutProductById,
	controllerGetProductById,
	/* controllerGetProductsTest, */
} = require('../controller/controllerProducts');
const routerProducts = new Router();

routerProducts.get('/', controllerGetProducts);
routerProducts.post('/', verifyTokenAndAdmin, controllerPostProduct);

routerProducts.get('/:productId', controllerGetProductById);
routerProducts.put('/:productId', verifyTokenAndAdmin, controllerPutProductById);
routerProducts.delete('/:productId', verifyTokenAndAdmin, controllerDeleteProductById);

/* routerProducts.get('/test', checkAuthentication controllerGetProductsTest); */

module.exports = routerProducts;
