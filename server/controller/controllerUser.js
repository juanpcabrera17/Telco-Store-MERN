const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userMongoDB } = require('../models/DAOs/DAOuserMongo');
const User = userMongoDB; //DAO.user.userMongoDB

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
/* const { passport } = require('../config/configAuth'); */

const createHash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
const isValidPassword = (user, password) => {
	return bcrypt.compareSync(password, user.password);
};

let refreshTokens = [];
let invalidatedAccessTokens = [];

/* const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		loggerWarn.info('no esta autenticado');
		res.status(401).json({ error: 'no esta autenticado' });
		 res.redirect('/api/usuario/login'); 
	}
}; */

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

const controllerPostRegister = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			loggerWarn.warn('User already exists');
			return res.status(400).json({ error: 'User already exists' });
		}
		const newUser = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: createHash(req.body.password),
			birthDate: req.body.birthDate,
			country: req.body.country,
			streetAddress: req.body.streetAddress,
			city: req.body.city,
			region: req.body.region,
			zipCode: req.body.zipCode,
			isSubscribed: req.body.isSubscribed,
		};

		User.create(newUser, (err, user) => {
			if (err) {
				loggerError.error('Error creating user: ' + err);
				res.status(500).json({ error: err });
			}
			loggerWarn.warn('User created' + JSON.stringify(newUser));
			res.status(201).json({ user });
		});
	} catch (err) {
		loggerError.error('Signup error: ' + err);
		res.status(500).json({ error: err });
	}

	/* passport.authenticate('signup', (err, user) => {
		if (err) {
			console.error(err);
			return next(err);
		}
		if (!user) {
			return res.status(400).json({ error: 'User already registered' });
		}
		res.status(201).json({ user });
	})(req, res, next); */
};

const controllerPostLogin = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			loggerWarn.warn('User not found');
			return res.status(400).json({ error: 'Incorrect email or password' });
		}
		if (!isValidPassword(user, req.body.password)) {
			loggerWarn.warn('Invalid password');
			return res.status(400).json({ error: 'Incorrect email or password' });
		}
		const accessToken = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '30s' }
		);
		const refreshToken = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_REFRESH_SECRET
		);
		refreshTokens.push(refreshToken);

		const { password, ...others } = user._doc;
		res.status(200).json({ ...others, accessToken, refreshToken });
	} catch (err) {
		loggerError.error('Login error: ' + err);
		res.status(500).json({ error: err });
	}
};

const controllerPostRefreshToken = async (req, res) => {
	// takes the refresh token from the user
	const refreshToken = req.body.token;

	//send error if the token is invalid
	if (!refreshToken) return res.status(401).json({ error: 'You are not authenticated' });
	if (!refreshTokens.includes(refreshToken))
		return res.status(403).json({ error: 'Refresh token is not valid' });

	//if everything is ok, creates new access token, refresh token and sends it to the user
	jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
		err && console.log(err);
		refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

		const newAccessToken = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWT_SECRET,
			{ expiresIn: '30s' }
		);
		const newRefreshToken = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWT_REFRESH_SECRET
		);

		refreshTokens.push(newRefreshToken);
		res.status(200).json({
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		});
	});
};

const controllerPostLogout = async (req, res) => {
	const refreshToken = req.body.token;
	const accessToken = req.headers.token.split(' ')[1];
	refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
	invalidatedAccessTokens.push(accessToken);
	res.status(200).json('Logged out successfully');
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
	/* checkAuthentication */
	controllerGetUsers,
	controllerGetUserById,
	controllerPutUserById,
	controllerDeleteUserById,
	controllerPostRegister,
	controllerPostLogin,
	controllerPostRefreshToken,
	controllerPostLogout,
	invalidatedAccessTokens,

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
