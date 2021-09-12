const jwt = require('jsonwebtoken');
const requireAuth = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.AUTH_SECRET, (err, decodedToken) => {
			if (err) {
				return res.json({ status: 'fail', message: 'unauthorized request' });
			}
			next();
		});
	} catch (err) {
		return res.json({ status: 'fail', message: 'unauthorized request' });
	}
};

module.exports = { requireAuth };
