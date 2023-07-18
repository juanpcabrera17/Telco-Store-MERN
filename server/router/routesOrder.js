const { Router } = require('express');
const { controllerPostOrder } = require('../controller/controllerOrder');
const routerOrder = new Router();

routerOrder.post('/', controllerPostOrder);

module.exports = routerOrder;
