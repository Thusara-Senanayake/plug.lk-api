const Product = require('../models/Product');
const { handleErrors } = require('../helpers/errorHandler');

const product_index_all = (req, res) => {
	const parameters = {};
	// searching functionality

	if (req.query.q) {
		const searchTerm = req.query.q;

		const searchTermRegex = new RegExp(
			searchTerm.trim().replace(' ', '|'),
			'i'
		);
		parameters.$or = [
			{ name: { $regex: searchTermRegex } },
			{ model: { $regex: searchTermRegex } },
			{ edition: { $regex: searchTermRegex } },
		];
	}
	Product.find(parameters, { createdAt: 0, updatedAt: 0, __v: 0 })
		.populate(
			'sellerInfo',
			'-address -phone -email -createdAt -updatedAt -__v -itemsSelling'
		)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			res.json({
				status: 'fail',
				data: [{ message: 'database error occured' }, { info: err }],
			});
		});
};

const product_index_one = (req, res) => {
	const id = req.params.id;
	Product.findById(id, { createdAt: 0, updatedAt: 0, __v: 0 })
		.populate(
			'sellerInfo',
			'-address -phone -email -createdAt -updatedAt -__v -itemsSelling'
		)
		.then((result) => {
			if (!result) {
				return res.json({ status: 'fail', message: 'resource not found' });
			}
			res.json(result);
		})
		.catch(() => {
			res.json({ status: 'fail', message: 'resource not found' });
		});
};
const product_create = (req, res) => {
	const product = new Product(req.body);
	product
		.save()
		.then((result) => {
			res.json({
				status: 'success',
				data: {
					id: result.id,
					name: result.name,
					url: `${process.env.HOST_NAME}:${process.env.PORT}/products/${result.id}`,
				},
			});
		})
		.catch((err) => {
			const error = handleErrors(err);
			res.json(error);
		});
};
const product_delete = (req, res) => {
	const id = req.params.id;
	Product.findByIdAndDelete(id)
		.then((result) => {
			res.json({
				status: 'success',
				data: {
					id: result.id,
					name: result.name,
				},
			});
		})
		.catch(() => {
			res.json({ status: 'fail', message: 'resource not found' });
		});
};
const product_edit = (req, res) => {
	const id = req.params.id;
	Product.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	})
		.then((result) => {
			if (!result) {
				return res.json({ status: 'fail', message: 'resource not found' });
			}
			res.json({
				status: 'success',
				data: {
					id: result.id,
					name: result.name,
					url: `${process.env.HOST_NAME}:${process.env.PORT}/products/${result.id}`,
				},
			});
		})
		.catch((err) => {
			const error = handleErrors(err);
			res.json(error);
		});
};
module.exports = {
	product_index_all,
	product_index_one,
	product_create,
	product_edit,
	product_delete,
};
