const { body, validationResult } = require("express-validator");

exports.registerValidators = [
  body("email").isEmail().withMessage("Enter your email correctly"),
  body("password", "Password should be min symbols").isLength({
    min: 6,
    max: 56,
  }),
  body("confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password should be similar");
    }
    return true;
  }),
];
