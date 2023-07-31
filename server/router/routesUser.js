const { Router } = require('express');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../config/configAuth');
const {
	controllerGetUsers,
	controllerGetUserById,
	controllerPutUserById,
	controllerDeleteUserById,
	controllerPostRegister,
	controllerPostLogin,
	controllerPostRefreshToken,
	controllerPostLogout,

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

routerUser.get('/', verifyTokenAndAdmin, controllerGetUsers);

routerUser.get('/:userId', verifyTokenAndAuthorization, controllerGetUserById);
routerUser.put('/:userId', verifyTokenAndAuthorization, controllerPutUserById);
routerUser.delete('/:userId', verifyTokenAndAuthorization, controllerDeleteUserById);

routerUser.post('/register', controllerPostRegister);

routerUser.post('/login', controllerPostLogin);

routerUser.post('/refreshtoken', controllerPostRefreshToken);

routerUser.post('/logout/:userId', verifyTokenAndAuthorization, controllerPostLogout);

/* routerUser.get('/faillogin', controllerGetFailLogin);

routerUser.get('/signup', controllerGetSignup); */
/* routerUser.post(
	'/signup',
	passport.authenticate('signup', { failureRedirect: '/api/usuario/failsignup' }),
	controllerPostSignup
); */

/* routerUser.get('/failsignup', controllerGetFailSignup);
routerUser.get('/info', controllerGetInfo); */

module.exports = routerUser;
