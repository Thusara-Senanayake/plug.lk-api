const faker = require('faker');
const bcrypt = require('bcrypt');

const info = { products: [], sellers: [] };

for (let a = 1; a <= 75; a++) {
	info.products.push({
		address: {
			addressLine1: faker.address.streetName(),
			addressLine2: faker.address.streetAddress(),
			addressLine3: `${faker.address.cityName()}, ${faker.address.stateAbbr()}`,
		},
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		images: [
			faker.image.imageUrl(),
			faker.image.imageUrl(),
			faker.image.imageUrl(),
		],
		phone: `0${faker.datatype.number({ min: 100000000, max: 999999999 })}`,
		condition: faker.random.objectElement({ one: 'New', two: 'Used' }),
		brand: faker.company.companyName(),
		model: faker.vehicle.model(),
		edition: faker.finance.bic(),
		sellerInfo: faker.random.objectElement({
			1: '613eaa57f5bcb9635d9c1a66',
			2: '613eaa57f5bcb9635d9c1a67',
			3: '613eaa57f5bcb9635d9c1a68',
			4: '613eaa57f5bcb9635d9c1a69',
			5: '613eaa57f5bcb9635d9c1a6a',
			6: '613eaa57f5bcb9635d9c1a6c',
		}),
	});
}
for (let a = 1; a <= 50; a++) {
	info.sellers.push({
		address: {
			addressLine1: faker.address.streetName(),
			addressLine2: faker.address.streetAddress(),
			addressLine3: `${faker.address.cityName()}, ${faker.address.stateAbbr()}`,
		},
		name: faker.name.findName(),
		shopURL: faker.internet.url(),
		profileImage: faker.image.imageUrl(),
		phone: `0${faker.datatype.number({ min: 100000000, max: 999999999 })}`,
		email: faker.internet.email(),
		password: bcrypt.hashSync(faker.internet.password(), bcrypt.genSaltSync()),
	});
}
console.log(JSON.stringify(info.products));
