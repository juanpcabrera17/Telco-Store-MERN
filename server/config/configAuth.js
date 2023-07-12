const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const DAO = require('../models/abstractFactory');
const { userMongoDB } = require('../models/DAOs/DAOuserMongo');

const User = userMongoDB; //DAO.user.userMongoDB

const { loggerWarn, loggerError } = require('./configWinston');

const isValidPassword = (user, password) => {
	return bcrypt.compareSync(password, user.password);
};
const createHash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

passport.use(
	'login',
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		(email, password, done) => {
			User.findOne({ email }, (err, user) => {
				if (err) return done(err);
				if (!user) {
					loggerWarn.info('Ningun usuario encontrado con el email ' + email);
					return done(null, false);
				}
				if (!isValidPassword(user, password)) {
					loggerWarn.info('Contraseña invalida');
					return done(null, false);
				}
				done(null, user);
			}).lean();
		}
	)
);

passport.use(
	'signup',
	new LocalStrategy(
		{
			passReqToCallback: true,
			usernameField: 'email',
		},
		(req, email, password, done) => {
			User.findOne({ email: email }, (err, user) => {
				if (err) {
					loggerError.error('Error en el signup: ' + err);
					return done(err);
				}
				if (user) {
					loggerWarn.warn('El usuario ya existe');
					return done(null, false);
				}
				const newUser = {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: email,
					password: createHash(password),
					birthDate: req.body.birthDate,
					country: req.body.country,
					streetAddress: req.body.streetAddress,
					city: req.body.city,
					region: req.body.region,
					zipCode: req.body.zipCode,
					isSubscribed: req.body.isSubscribed,
				};
				User.create(newUser, (err, userWithId) => {
					if (err) {
						loggerError.error('Error guardando el usuario: ' + err);
						return done(err);
					}
					console.log('newUser: ' + JSON.stringify(newUser));
					loggerWarn.info('El usuario fue registrado con exito');
					return done(null, userWithId);
				});
			});
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, done);
});

module.exports = { passport };
