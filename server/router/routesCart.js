const { Router } = require('express');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../config/configAuth');
const {
	controllerGetCart,
	controllerPostCart,
	controllerPutCart,
	controllerDeleteCartById,
	controllerPostPurchaseCart,
} = require('../controller/controllerCart');
/* const { checkAuthentication } = require('../controller/controllerUsuario'); */
const routerCart = new Router();

routerCart.get('/:userId', verifyTokenAndAuthorization, controllerGetCart);

routerCart.post('/', verifyTokenAndAuthorization, controllerPostCart); //obsolete, useCart() instead

routerCart.put('/:userId', controllerPutCart); //obsolete, useCart() instead

routerCart.delete('/:userId', controllerDeleteCartById); //obsolete, useCart() instead

/* routerCart.post('/', controllerPostPurchaseCart); */

module.exports = routerCart;
