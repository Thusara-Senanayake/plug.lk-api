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
		const errorField = Object.keys(err.keyValue)[0];
		const errorValue = Object.values(err.keyValue)[0];
		error.data.push({ [errorField]: `${errorValue} is already being used` });
		return error;
	}
	if (err.name === 'CastError') {
		error.data.push({ [err.path]: err.message });
		return error;
	}
	if (err.code === 66) {
		error.data.push({ id: 'id is immutable' });
		return error;
	}
	error.data.push(err);
	return error;
};
module.exports = {
	handleErrors,
};
