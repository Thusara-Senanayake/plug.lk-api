const jwt = require('jsonwebtoken');
const requireSellerAuth = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SELLER_AUTH_SECRET, (err, decodedToken) => {
			if (err) {
				return res.json({ status: 'fail', message: 'unauthorized request' });
			}
			next();
		});
	} catch (err) {
		return res.json({ status: 'fail', message: 'unauthorized request' });
	}
};
const requireAdminAuth = (req, res, next) => {
	try {
		// const token = req.headers.authorization.split(' ')[1];
		const token = process.env.ADMIN_AUTH_JWT;

		jwt.verify(token, process.env.ADMIN_AUTH_SECRET, (err, decodedToken) => {
			if (err) {
				return res.json({ status: 'fail', message: 'unauthorized request' });
			}
			next();
		});
	} catch (err) {
		return res.json({ status: 'fail', message: 'unauthorized request' });
	}
};

module.exports = { requireSellerAuth, requireAdminAuth };
