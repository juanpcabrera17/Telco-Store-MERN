const DAOproductMongo = require('./DAOs/DAOproductMongo');
const DAOcartMongo = require('./DAOs/DAOcartMongo');
const DAOproductsFile = require('./DAOs/DAOproductsFile');
const DAOcartFile = require('./DAOs/DAOcartFile');
const DAOchatMongo = require('./DAOs/DAOchatMongo');
const DAOuserMongo = require('./DAOs/DAOuserMongo');

let DAO;
let mode = process.argv[2];

if (mode == 'mongo') {
	DAO = {
		product: new DAOproductMongo(),
		cart: new DAOcartMongo(),
		chat: new DAOchatMongo(),
		user: new DAOuserMongo.userContainer(),
	};
} else if (mode == 'file') {
	DAO = {
		product: new DAOproductsFile(),
		cart: new DAOcartFile(),
	};
} else {
	throw 'Indicar el tipo de persistencia en argumentos';
}

module.exports = DAO;
