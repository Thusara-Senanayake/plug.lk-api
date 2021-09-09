const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
// const cookieParser = require('cookie-parser');

const app = express();

// ---------- config ----------
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
	.then((res) =>
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
// ---------- redirects ----------
app.get('/', (req, res) => {});

// ---------- bottom m/ws ----------
// ---------- error handling ----------

app.use((req, res) => {
	res.status(404).json({
		status: 'fail',
		data: 'data not found',
	});
});
