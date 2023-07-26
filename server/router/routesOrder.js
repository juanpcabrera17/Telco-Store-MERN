const { Router } = require('express');
const { controllerGetOrder, controllerPostOrder } = require('../controller/controllerOrder');
const routerOrder = new Router();

routerOrder.get('/:userId', controllerGetOrder);

routerOrder.post('/', controllerPostOrder);

module.exports = routerOrder;
