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
		id: { type: String, unique: true },
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
		// sellerInfo: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: Seller,
		// },
	},
	{ timestamps: true }
);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
// User
//    .findOne({_id: userId })
//    .populate("blogs",{ name: 1 }) // key to populate

/* 

 Update validators are off by default - you need to specify the runValidators option.



 toySchema.path('color').validate(function(value) {
  // When running update validators, `this` refers to the query object.
  if (this.getUpdate().$set.name.toLowerCase().indexOf('red') !== -1) {
    return value === 'red';
  }
  return true;
});

const Toy = db.model('Figure', toySchema);

const update = { color: 'blue', name: 'Red Power Ranger' };
// Note the context option
const opts = { runValidators: true, context: 'query' };

Toy.updateOne({}, update, opts, function(error) {
  assert.ok(error.errors['color']);
});

Update Validators Only Run For Some Operations
$set
$unset
$push (>= 4.8.0)
$addToSet (>= 4.8.0)
$pull (>= 4.12.0)
$pullAll (>= 4.12.0)

Also, $push, $addToSet, $pull, and $pullAll validation does not run any validation on the array itself, only individual elements of the array. 


*/
