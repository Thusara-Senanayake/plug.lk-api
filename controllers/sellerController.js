const Seller = require('../models/Seller');
const { v4: uuidv4 } = require('uuid');
const { handleErrors } = require('../helpers/errorHandler');

const hostURL = 'http://localhost';
const hostPort = process.env.PORT || 3000;

const seller_index_all = (req, res) => {
	Seller.find({}, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
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

const seller_index_one = (req, res) => {
	const id = req.params.id;
	Seller.findOne({ id }, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
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
const seller_create = (req, res) => {
	function getNewSeller(req) {
		const { name, profileImage, address, phone, email } = req.body;
		return {
			id: uuidv4(),
			name,
			profileImage,
			address,
			phone,
			email,
		};
	}
	const seller = new Seller(getNewSeller(req));
	seller
		.save()
		.then((result) => {
			res.json({
				status: 'success',
				data: {
					id: result.id,
					name: result.name,
					url: `${hostURL}:${hostPort}/sellers/${result.id}`,
				},
			});
		})
		.catch((err) => {
			const error = handleErrors(err);
			res.json(error);
		});
};
const seller_delete = (req, res) => {
	const id = req.params.id;
	Seller.findOneAndRemove({ id })
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
const seller_edit = (req, res) => {
	const id = req.params.id;
	Seller.findOneAndUpdate({ id }, req.body, { new: true, runValidators: true })
		.then((result) => {
			if (!result) {
				return res.json({ status: 'fail', message: 'resource not found' });
			}
			res.json({
				status: 'success',
				data: {
					id: result.id,
					name: result.name,
					url: `${hostURL}:${hostPort}/sellers/${result.id}`,
				},
			});
		})
		.catch((err) => {
			const error = handleErrors(err);
			res.json(error);
		});
};
module.exports = {
	seller_index_all,
	seller_index_one,
	seller_create,
	seller_edit,
	seller_delete,
};
