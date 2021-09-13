const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
	{
		addressLine1: {
			type: String,
			required: [true, 'Address line 1 is required.'],
			minLength: [1, 'Address line 1 must be at least 1 characters long.'],
			maxLength: [255, 'Address line 1 must not exceed 255 characters.'],
			trim: true,
		},
		addressLine2: {
			type: String,
			required: [true, 'Address line 2 is required.'],
			minLength: [5, 'Address line 2 must be at least 5 characters long.'],
			maxLength: [255, 'Address line 2 must not exceed 255 characters.'],
			trim: true,
		},
		addressLine3: {
			type: String,
			minLength: [5, 'Address line 1 must be at least 5 characters long.'],
			maxLength: [255, 'Address line 1 must not exceed 255 characters.'],
			trim: true,
		},
	},
	{ _id: false }
);

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required.'],
			minLength: [5, 'Name must be at least 5 characters long.'],
			maxLength: [255, 'Name must not exceed 255 characters.'],
			trim: true,
		},
		description: {
			type: String,
			required: [true, 'Description is required'],
			minLength: [5, 'Description must be at least 5 characters long'],
			maxLength: [1024, 'Description must not exceed 1024 characters'],
			trim: true,
		},
		images: {
			type: [String],
			validate: {
				validator: (v) => Array.isArray(v) && v.length > 0,
				message: 'Please insert at least one image',
			},
		},
		postedDate: {
			type: Date,
			default: Date.now,
		},
		address: {
			type: addressSchema,
			required: [true, 'Address is required'],
		},
		phone: {
			type: String,
			required: [true, 'Phone number is required'],
			validate: {
				validator: function (v) {
					return /^0[1-9]{1}[0-9]{8}$/.test(v);
				},
				message: (props) => `${props.value} is not a valid phone number`,
			},
		},
		condition: {
			type: String,
			required: [true, 'Item condition is required.'],
			enum: ['Used', 'New'],
			maxLength: [10, 'Description must not exceed 10 characters'],
			trim: true,
		},
		brand: {
			type: String,
			maxLength: [50, 'Description must not exceed 50 characters'],
			trim: true,
		},
		model: {
			type: String,
			maxLength: [50, 'Description must not exceed 50 characters'],
			trim: true,
		},

		status: {
			type: Boolean,
			default: true,
		},

		edition: {
			type: String,
			trim: true,
			maxLength: [50, 'Description must not exceed 50 characters'],
		},
		sellerInfo: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, 'seller information is required'],
			ref: 'Seller',
		},
	},
	{ timestamps: true }
);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
