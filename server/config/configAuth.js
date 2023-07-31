const jwt = require('jsonwebtoken');
const { invalidatedAccessTokens } = require('../controller/controllerUser');

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.token;
	if (authHeader) {
		const token = authHeader.split(' ')[1];
		if (invalidatedAccessTokens.includes(token)) {
			return res.status(401).json({ error: 'Invalid token. Please log in again.' });
		}
		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) res.status(403).json('Token is not valid!');
			req.user = user;
			next();
		});
	} else {
		return res.status(401).json('You are not authenticated!');
	}
};

const verifyTokenAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.userId || req.user.isAdmin) {
			next();
		} else {
			res.status(403).json({ error: 'You are not alowed to do that!' });
		}
	});
};

const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			res.status(403).json('You are not alowed to do that!');
		}
	});
};

module.exports = {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
};
