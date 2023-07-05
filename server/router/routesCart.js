const { Router } = require('express');
const {
	controllerGetCart,
	controllerPostCart,
	controllerPutCart,
	controllerDeleteCartById,
	controllerPostPurchaseCart,
} = require('../controller/controllerCart');
/* const { checkAuthentication } = require('../controller/controllerUsuario'); */
const routerCart = new Router();

routerCart.get('/:userId', /* checkAuthentication */ controllerGetCart);

routerCart.post('/', controllerPostCart);

routerCart.put('/:userId', controllerPutCart);

routerCart.delete('/:userId', controllerDeleteCartById);

/* routerCart.post('/', controllerPostPurchaseCart); */

module.exports = routerCart;
