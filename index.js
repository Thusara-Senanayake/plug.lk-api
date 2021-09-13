const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const sellerRoutes = require('./routes/sellerRoutes');

const app = express();

// ---------- config ----------
app.set('json spaces', 2);
const port = process.env.PORT || 3000;
dotenv.config();

// ---------- database ----------
mongoose
	// eslint-disable-next-line no-undef
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
app.use('/products', productRoutes);
app.use('/sellers', sellerRoutes);
app.use((req, res, next) => {
	const error = new Error(404);
	next(error);
});
// ---------- redirects ----------
app.get('/', (req, res) => {
	res.json({
		status: 'success',
		data: [
			{
				endpoint: 'prouducts',
				url: `${process.env.HOSTNAME}:${process.env.PORT}/products`,
			},
			{
				endpoint: 'sellers',
				url: `${process.env.HOSTNAME}:${process.env.PORT}/sellers`,
			},
		],
	});
});

// ---------- bottom m/ws ----------
// ---------- error handling ----------

app.use((err, req, res, next) => {
	if (err.message === '404') {
		return res.status(404).json({
			status: 'fail',
			data: 'data not found',
		});
	}

	res.json({ status: 'error', message: 'invalid request' });
	next();
});
