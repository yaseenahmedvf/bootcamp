const User = require('../models/user');
const bcrypt = require('bcrypt');

//create users via signup
exports.createUsers = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			throw new Error(400);
		}
		const user = new User({
			name,
			email,
			password
		})

		//generate salt to hash password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);

		await user.save();
		res.status(201).json({
			message: "Successfully created"
		})
	} catch (err) {
		// console.log(err);
		next(err);
	}
}

//login users
exports.login = async (req, res, next) => {
	try {
		const body = req.body;
		const user = await User.findOne({email: body.email});
		if (user) {
			const validation = await bcrypt.compare(body.password, user.password);
			if(validation) {
				console.log('password is correct...');
			}else {
				console.log('Password incorrect..');
			}
		}
	}catch(err) {
		next(err);
	}
}
