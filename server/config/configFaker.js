const { faker } = require('@faker-js/faker');
faker.locale = 'es';

const generateProduct = (id) => {
	return {
		id,
		name: faker.commerce.productName(),
		price: faker.commerce.price(1000, 30000),
		thumbnail: faker.image.technics((width = 640), (height = 480), (randomize = true)),
	};
};

const generatedProducts = () => {
	let products = [];
	for (let id = 1; id < 6; id++) {
		products.push(generateProduct(id));
	}
	return products;
};

module.exports = generatedProducts;
