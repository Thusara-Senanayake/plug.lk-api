const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
	{ _id: 0 }
);

const sellerSchema = new mongoose.Schema(
	{
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
					return /^0[1-9]{1}[0-9]{8}$/.test(v);
				},
				message: (props) => `${props.value} is not a valid phone number`,
			},
		},
		shopURL: {
			type: String,
			trim: true,
			maxLength: [255, 'Description must not exceed 255 characters'],
		},
		email: {
			type: String,
			unique: true,
			required: [true, 'E-mail is required'],
			maxLength: [255, 'E-mail must not exceed 255 characters'],
			validate: {
				validator: (v) =>
					/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
						v
					),
				message: 'Invalid e-mail',
			},
		},

		isMember: {
			type: Boolean,
			default: false,
		},
		itemsSelling: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Product',
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			select: false,
			maxLength: [1024, 'Password must not exceed 1024 characters'],
			minLength: [6, 'Use at least 6 characters'],
		},
	},
	{ timestamps: true }
);
sellerSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

const Seller = mongoose.model('Seller', sellerSchema);
module.exports = Seller;
