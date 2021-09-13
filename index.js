const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const indexRoutes = require('./routes/indexRoutes');

const app = express();

// ---------- config ----------
app.set('json spaces', 2);
const port = process.env.PORT || 5000;
dotenv.config();

// ---------- database ----------
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoIndex: true,
	})
	.then(() =>
		app.listen(port, () => {
			console.log('server started listening');
		})
	)
	.catch((err) => {
		console.log(err);
	});

// ---------- top m/ws ----------
app.use('/public', express.static('./public'));
app.use(express.json());

// ---------- routes ----------
app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/sellers', sellerRoutes);

// ---------- redirects ----------
// ---------- bottom m/ws ----------

// ---------- error handling ----------

app.use((req, res, next) => {
	const error = new Error(404);
	next(error);
});

app.use((err, req, res, next) => {
	if (err.message === '404') {
		return res.status(404).json({
			status: 'fail',
			message: 'resource not found',
		});
	}

	res.json({ status: 'error', message: 'invalid request' });
	next();
});
