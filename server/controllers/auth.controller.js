const { User } = require("../sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/asyncHandler");

const signup = asyncHandler(async (req, res, next) => {
  // Create a new user with the hashed password
  const user = await User.create(req.body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // Generate a JWT token
  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(200).json({ success: true, data: token });
});

const login = asyncHandler(async (req, res, next) => {
  // Destructuring email and password from the request body
  const { email, password } = req.body;

  // Find the user with the provided email
  const user = await User.findOne({ where: { email } });

  // If no user is found, return an error
  if (!user) {
    return next({
      message: "The email is not yet registered",
      statusCode: 400,
    });
  }

  // Compare the provided password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);

  // If passwords do not match, return an error message with status code
  if (!passwordMatch) {
    return next({
      message: "The password does not match",
      statusCode: 400,
    });
  }

  // Generate a JWT token for successful authentication
  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // Send the token as a response
  res.status(200).json({ success: true, data: token });
});

module.exports = { signup, login };
