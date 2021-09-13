const Seller = require('../models/Seller');
const { handleErrors } = require('../helpers/errorHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// equals to 1 day
const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, process.env.SELLER_AUTH_SECRET, {
		expiresIn: maxAge,
	});
};

const seller_index_all = (req, res) => {
	Seller.find({}, { createdAt: 0, updatedAt: 0, __v: 0 })
		.populate(
			'itemsSelling',
			'-address -phone -email -createdAt -updatedAt -__v -sellerInfo'
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

const seller_index_one = (req, res) => {
	const id = req.params.id;
	Seller.findById(id, { createdAt: 0, updatedAt: 0, __v: 0 })
		.populate('itemsSelling', '_id name status postedDate')
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
const seller_create = (req, res) => {
	const seller = new Seller(req.body);
	seller
		.save()
		.then((result) => {
			res.json({
				status: 'success',
				data: {
					id: result._id,
					name: result.name,
					token: `Bearer ${createToken(result._id)}`,
					url: `${process.env.HOST_NAME}/sellers/${result.id}`,
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
	Seller.findByIdAndDelete(id)
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
	Seller.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
		.then((result) => {
			if (!result) {
				return res.json({ status: 'fail', message: 'resource not found' });
			}
			res.json({
				status: 'success',
				data: {
					id: result._id,
					name: result.name,
					url: `${process.env.HOST_NAME}/sellers/${result.id}`,
				},
			});
		})
		.catch((err) => {
			const error = handleErrors(err);
			res.json(error);
		});
};
const seller_login = (req, res) => {
	const { email, password } = req.body;
	Seller.findOne({ email }, { password: 1, email: 1, _id: 1 })
		.then((result) => {
			if (result) {
				const auth = bcrypt.compareSync(password, result.password);
				if (auth) {
					const token = createToken(result._id);
					return res.json({
						status: 'success',
						authorization: `Bearer ${token} `,
					});
				}
				return res.json({ status: 'fail', message: 'invalid password' });
			}
			return res.json({ status: 'fail', message: 'invalid email' });
		})
		.catch(() => {
			res.json({ status: 'fail', message: 'invalid request' });
		});
};
module.exports = {
	seller_index_all,
	seller_index_one,
	seller_create,
	seller_edit,
	seller_delete,
	seller_login,
};
