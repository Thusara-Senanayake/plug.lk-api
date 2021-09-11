const Product = require('../models/Product');
const { v4: uuidv4 } = require('uuid');
const { handleErrors } = require('../helpers/errorHandler');

const hostURL = 'http://localhost';
const hostPort = process.env.PORT || 3000;

const product_index_all = (req, res) => {
	Product.find({}, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
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
	Product.findOne({ id }, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
		.then((result) => {
			if (!result) {
				return res.json({ status: 'fail', message: 'resource not found' });
			}
		})
		.catch((err) => {
			res.json({
				status: 'fail',
				data: [{ message: 'database error occured' }, { info: err }],
			});
		});
};
const product_create = (req, res) => {
	function getNewProduct(req) {
		const {
			name,
			description,
			images,
			address,
			phone,
			brand,
			model,
			edition,
			condition,
		} = req.body;
		return {
			id: 'uuidv4()',
			name,
			description,
			images,
			address,
			phone,
			brand,
			model,
			edition,
			condition,
		};
	}
	const product = new Product(getNewProduct(req));
	product
		.save()
		.then((result) => {
			res.json({
				status: 'success',
				data: {
					id: result.id,
					name: result.name,
					url: `${hostURL}:${hostPort}/products/${result.id}`,
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
	Product.findOneAndRemove({ id })
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
	Product.findOneAndUpdate({ id }, req.body, {
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
					url: `${hostURL}:${hostPort}/products/${result.id}`,
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
