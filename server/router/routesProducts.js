const { Router } = require('express');
const {
	controllerGetProducts,
	controllerGetProductsByCategory,
	controllerPostProduct,
	controllerDeleteProductById,
	controllerPutProductById,
	controllerGetProductById,
	/* controllerGetProductsTest, */
} = require('../controller/controllerProducts');
/* const { checkAuthentication } = require('../controller/controllerUsuario'); */
const routerProducts = new Router();

routerProducts.get('/', /* checkAuthentication */ controllerGetProducts);
routerProducts.post('/', controllerPostProduct);

routerProducts.get('/:productId', controllerGetProductById);
routerProducts.put('/:productId', controllerPutProductById);
routerProducts.delete('/:productId', controllerDeleteProductById);

/* routerProducts.get('/test', checkAuthentication controllerGetProductsTest); */

module.exports = routerProducts;
