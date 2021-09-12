const Product = require('../models/Product');
const { handleErrors } = require('../helpers/errorHandler');
var ObjectId = require('mongoose').Types.ObjectId;
const hostURL = 'http://localhost';
const hostPort = process.env.PORT || 3000;

const product_index_all = (req, res) => {
	Product.find({}, { createdAt: 0, updatedAt: 0, __v: 0 })
		.populate('sellerInfo', '-address -phone -email -createdAt -updatedAt -__v')
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
		.populate('sellerInfo', '-address -phone -email -createdAt -updatedAt -__v')
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
			sellerInfo,
		} = req.body;
		return {
			name,
			description,
			images,
			address,
			phone,
			brand,
			model,
			edition,
			condition,
			sellerInfo,
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
