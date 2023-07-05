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
			usernameField: 'idEmail',
		},
		(idEmail, password, done) => {
			User.findOne({ idEmail }, (err, user) => {
				if (err) return done(err);
				if (!user) {
					loggerWarn.info('Ningun usuario encontrado con el email ' + idEmail);
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
			usernameField: 'idEmail',
		},
		(req, idEmail, password, done) => {
			User.findOne({ idEmail: idEmail }, (err, user) => {
				if (err) {
					loggerError.error('Error en el signup: ' + err);
					return done(err);
				}
				if (user) {
					loggerWarn.warn('El usuario ya existe');
					return done(null, false);
				}
				const newUser = {
					idEmail: idEmail,
					username: req.body.username,
					password: createHash(password),
					name: req.body.name,
					surname: req.body.surname,
					age: req.body.age,
					alias: req.body.alias,
					phoneNumber: req.body.phoneNumber,
					avatar: req.body.avatar,
				};
				User.create(newUser, (err, userWithId) => {
					if (err) {
						loggerError.error('Error guardando el usuario: ' + err);
						return done(err);
					}
					console.log('newUser: ' + newUser);
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
