const home = (req, res) => {
	res.json({
		status: 'success',
		data: [
			{
				products: [
					{
						endpoint: `GET ${process.env.HOST_NAME}/products`,
						description: 'to index all products',
					},
					{
						endpoint: `GET ${process.env.HOST_NAME}/products/<id>`,
						description: 'to index a single product',
					},
					{
						endpoint: `DELETE ${process.env.HOST_NAME}/products/<id>`,
						description: 'to delete a product',
						authorization: 'required',
					},
					{
						endpoint: `PUT ${process.env.HOST_NAME}/products/<id>`,
						description: 'to edit a product',
						authorization: 'required',
					},
					{
						endpoint: `POST ${process.env.HOST_NAME}/products`,
						description: 'to create a new product',
						authorization: 'required',
					},
					{
						endpoint: `GET ${process.env.HOST_NAME}/products?q=<search term>`,
						description: 'to search for a product by name, model, edition',
						authorization: 'required',
					},
				],
				sellers: [
					{
						endpoint: `POST ${process.env.HOST_NAME}/sellers`,
						description:
							'to create a new seller, returns authorization details',
					},
					{
						endpoint: `POST ${process.env.HOST_NAME}/sellers/login`,
						description: 'to log in a seller, returns authorization details',
					},
					{
						endpoint: `GET ${process.env.HOST_NAME}/sellers`,
						description: 'to index all sellers',
						isPrivate: true,
					},
					{
						endpoint: `GET ${process.env.HOST_NAME}/sellers/<id>`,
						description: 'to index a single seller',
						authorization: 'required',
					},
					{
						endpoint: `DELETE ${process.env.HOST_NAME}/sellers/<id>`,
						description: 'to delete a seller',
						authorization: 'required',
					},
					{
						endpoint: `PUT ${process.env.HOST_NAME}/sellers/<id>`,
						description: 'to edit a seller',
						authorization: 'required',
					},
					{ readMore: 'https://github.com/Thusara-Senanayake/plug.lk-api' },
				],
			},
		],
	});
};

module.exports = { home };
