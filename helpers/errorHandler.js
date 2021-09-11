const handleErrors = (err) => {
	const error = {
		status: 'error',
		data: [],
	};

	// checking for cast and validation errors
	if (err.errors) {
		const errorFields = Object.keys(err.errors);
		errorFields.forEach((errorField) => {
			error.data.push({ [errorField]: err.errors[errorField].message });
		});
		return error;
	}

	// checking for duplicate values
	if (err.code === 11000) {
		error.data.push({ id: `${err.keyValue.id} is already being used` });
		return error;
	}
};
module.exports = {
	handleErrors,
};
