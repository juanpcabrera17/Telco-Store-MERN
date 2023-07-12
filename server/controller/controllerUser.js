const {
	getUsers,
	getUserById,
	updateUserById,
	deleteUserById,
	getInfoUser,
	getInfoSignup,
	getAllData,
} = require('../service/serviceUser');
const { registerEmail } = require('../config/configNodemailer');
const { loggerWarn, loggerError } = require('../config/configWinston');
const { passport } = require('../config/configAuth');

const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		loggerWarn.info('no esta autenticado');
		res.status(401).json({ error: 'no esta autenticado' });
		/* res.redirect('/api/usuario/login'); */
	}
};

const controllerGetUsers = async (req, res) => {
	const users = await getUsers();
	res.status(200).json({ users });
};

const controllerGetUserById = async (req, res) => {
	const user = await getUserById(req.params.userId);
	res.status(200).json({ user });
};

const controllerPutUserById = async (req, res) => {
	const updatedUser = await updateUserById(req.params.userId, req.body);
	res.status(201).json({ updatedUser });
};

const controllerDeleteUserById = async (req, res) => {
	const user = await deleteUserById(req.params.userId);
	res.status(200).json({ user });
};

const controllerPostRegister = async (req, res, next) => {
	passport.authenticate('signup', (err, user) => {
		if (err) {
			console.error(err);
			return next(err);
		}
		if (!user) {
			return res.status(400).json({ error: 'User already registered' });
		}
		res.status(201).json({ user });
	})(req, res, next);
};

const controllerPostLogin = async (req, res, next) => {
	await passport.authenticate('login', (err, user) => {
		if (err) {
			console.error(err);
			return next(err);
		}
		if (!user) {
			return res.status(400).json({ error: 'The username or password is incorrect' });
		}
		/* req.session.userid = user._id; */
		res.status(201).json({ user });
	})(req, res, next);
};

/*
 const controllerGetLogin = (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect('/api/productos');
	} else {
		return res.render('login');
	}
}; 


/* const controllerGetFailLogin = (req, res) => {
	res.render('failLogin');
}; 

 const controllerGetSignup = (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect('/api/productos');
	} else {
		res.render('signup');
	}
}; 

	const controllerPostSignup = (req, res) => {
	const user = getInfoSignup(req.user);
	registerEmail(user);
	res.status(302).json(user);
	/* res.redirect('/api/productos'); 
}; 

 const controllerGetFailSignup = (req, res) => {
	res.render('failSignup');
}; 

 const controllerGetLogout = (req, res) => {
	const username = req.user.username;

	req.session.destroy((err) => {
		if (err) {
			loggerError.error(`error: ${err}`);
			res.send('no pudo deslogear');
		} else {
			res.render('logout', { username });
		}
	});
}; 

 const controllerGetInfo = (req, res) => {
	const data = getAllData();
	res.render('info', data);
}; */

module.exports = {
	checkAuthentication,
	controllerGetUsers,
	controllerGetUserById,
	controllerPutUserById,
	controllerDeleteUserById,
	controllerPostRegister,
	controllerPostLogin,

	/* 	checkAuthentication,
	controllerGetLogin, 
	controllerPostLogin,
	controllerGetFailLogin,
	controllerGetSignup, 
	controllerPostSignup,
	controllerGetFailSignup,
	controllerGetLogout,
	controllerGetInfo, */
};
