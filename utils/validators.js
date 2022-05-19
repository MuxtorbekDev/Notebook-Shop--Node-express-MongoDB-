const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.registerValidators = [
  body("email")
    .isEmail()
    .withMessage("Enter your email correctly")
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("This email is already exist");
        }
      } catch (e) {
        console.log(e);
      }
    })
    .normalizeEmail(),
  body("password", "Password should be min 6 symbols")
    .isLength({
      min: 6,
      max: 56,
    })
    .isAlphanumeric()
    .trim(),
  body("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password should be similar");
      }
      return true;
    })
    .isLength({
      min: 6,
      max: 56,
    })
    .isAlphanumeric()
    .trim(),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name should be min 3 symbols")
    .trim(),
];
