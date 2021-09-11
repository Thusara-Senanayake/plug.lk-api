const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
	addressLine1: {
		type: String,
		required: [true, 'Address line 1 is required.'],
		minLength: [5, 'Address line 1 must be at least 5 characters long.'],
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
});

const sellerSchema = new mongoose.Schema(
	{
		id: String,
		name: {
			type: String,
			required: [true, 'Name is required.'],
			minLength: [5, 'Name must be at least 5 characters long.'],
			maxLength: [255, 'Name must not exceed 255 characters.'],
			trim: true,
		},

		profileImage: {
			type: String,
			trim: true,
			maxLength: [255, 'Profile image must not exceed 255 characters.'],
		},
		joinedDate: {
			type: Date,
			default: Date.now,
		},
		address: {
			type: addressSchema,
			required: true,
		},
		phone: {
			type: String,
			required: [true, 'Phone number is required'],
			validate: {
				validator: function (v) {
					return /^0[1-9]{1}[0-9]{8}$/.test();
				},
				message: (props) => `${props.value} is not a valid phone number!`,
			},
		},
		shopURL: {
			type: String,
			trim: true,
			maxLength: [255, 'Description must not exceed 255 characters'],
		},
		email: {
			type: String,
			required: [true, 'E-mail is required'],
			maxLength: [255, 'E-mail must not exceed 255 characters'],
			validate: {
				validator: function (v) {
					return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
						v
					);
				},
				message: 'Invalid e-mail',
			},
		},

		isMember: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Seller = mongoose.model('Seller', sellerSchema);
module.exports = Seller;
