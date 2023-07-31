const { Router } = require('express');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../config/configAuth');
const { controllerGetOrder, controllerPostOrder } = require('../controller/controllerOrder');
const routerOrder = new Router();

routerOrder.get('/:userId', verifyTokenAndAuthorization, controllerGetOrder);

routerOrder.post('/:userId', verifyTokenAndAuthorization, controllerPostOrder);

//add admin routes

module.exports = routerOrder;
