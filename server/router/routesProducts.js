const { Router } = require('express');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../config/configAuth');
const { controllerGetProducts, controllerGetProductsByCategory, controllerPostProduct, controllerDeleteProductById, controllerPutProductById, controllerGetProductById } = require('../controller/controllerProducts');
const routerProducts = new Router();

routerProducts.get('/', controllerGetProducts);
routerProducts.post('/', verifyTokenAndAdmin, controllerPostProduct);

routerProducts.get('/:productId', controllerGetProductById);
routerProducts.put('/:productId', verifyTokenAndAdmin, controllerPutProductById);
routerProducts.delete('/:productId', verifyTokenAndAdmin, controllerDeleteProductById);

module.exports = routerProducts;
