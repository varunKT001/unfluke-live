const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [30, 'Name cannot exceed 30 characters'],
      minLength: [4, 'Name must be atleast 4 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      validate: [validator.isEmail, 'Please enter a valid email'],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide a phone number'],
      validate: [validator.isMobilePhone, 'Please enter a valid phone number'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: [8, 'Password must be atleast 8 characters long'],
      select: false,
    },
  },
  { timestamps: true }
);

// validation for phone numbers
function isPhone(v) {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v);
}

// checking for changed password
userModel.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// creating jsonwebtoken
userModel.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// comparing passwords
userModel.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userModel);
