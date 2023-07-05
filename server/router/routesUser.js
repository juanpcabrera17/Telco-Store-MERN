const { Router } = require('express');
const { passport } = require('../config/configServer');
const {
	controllerGetUsers,
	controllerGetUserById,
	controllerPostRegister,
	controllerPostLogin,
	controllerPutUserById,
	controllerDeleteUserById,

	/* controllerGetLogin,
	controllerPostLogin,
	controllerGetFailLogin,
	controllerGetSignup,
	controllerPostSignup,
	controllerGetFailSignup,
	controllerGetLogout,
	controllerGetInfo, */
} = require('../controller/controllerUser');
const routerUser = new Router();

routerUser.get('/', controllerGetUsers);

routerUser.get('/:userId', controllerGetUserById);
routerUser.put('/:userId', controllerPutUserById);
routerUser.delete('/:userId', controllerDeleteUserById);

routerUser.post('/register', controllerPostRegister);

routerUser.post('/login', controllerPostLogin);

/* routerUser.get('/faillogin', controllerGetFailLogin);

routerUser.get('/signup', controllerGetSignup); */
/* routerUser.post(
	'/signup',
	passport.authenticate('signup', { failureRedirect: '/api/usuario/failsignup' }),
	controllerPostSignup
); */

/* routerUser.get('/failsignup', controllerGetFailSignup);
routerUser.get('/logout', controllerGetLogout);
routerUser.get('/info', controllerGetInfo); */

module.exports = routerUser;
