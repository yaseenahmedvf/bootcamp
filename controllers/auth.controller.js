const User = require('../models/user');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const schemaValidate = require('../helper/schema.validation');
const createError = require('http-errors');

//create users via signup
exports.createUsers = async (req, res, next) => {
  try {
    const result = await schemaValidate.authSchema.validateAsync(req.body);	//validation the user input by joi pakage
    const doesExist = await User.findOne({ email: result.email }).lean();
    if (doesExist) {
      throw createError.Conflict(`${result.email} is already been registered`);
    }
    const user = new User(result)

    //generate salt
    const salt = await bcrypt.genSalt(10);
    //convert the plain text into hash
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.status(201).json({
      message: "Successfully created"
    })
  } catch (err) {
    next(err);
  }
}

//login users
exports.login = async (req, res, next) => {
  try {
    const result = await schemaValidate.authSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email }).lean();
    if (!user) {
      throw createError.NotFound("User not registered");
    }
    const validation = await bcrypt.compare(result.password, user.password);
    if (!validation) {
      throw createError.Forbidden("Password didnot match");
    }

    //if validate then generate jwt
    const jwt_secret_key = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      jwt_secret_key,
      {
        expiresIn: "30d",
      }
    );
    user.token = token;
    res.status(200).json({
      data: user
    })
  } catch (err) {
    // to prevent the default error message to secure the security issue, generate the custome error 
    if (err.isJoi == true) return next(createError.BadRequest('Invalid Username/Password'));
    next(err);
  }
}

//change password
exports.changePassword = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

//forgot password
exports.forgotPassword = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

//reset password
exports.resetPassword = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}