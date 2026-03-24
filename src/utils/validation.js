const validator = require('validator');

const validateSignUpData = (req) => {

    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("First and Last name is not valid");
    }

    if (!validator.isEmail(emailId)) {
        throw new Error("Email id is not valid");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong");
    }
};

const validateEditProfileData = (req) => {
    const allowedEditFields = [
      "firstName",
      "lastName",
      "emailId",
      "photoUrl",
      "gender",
      "age",
      "about",
      "skill",
    ];
  
    const isEditAllowed = Object.keys(req.body).every((field) =>
      allowedEditFields.includes(field)
    );
  
    return isEditAllowed;
  };

module.exports = {
    validateSignUpData,
    validateEditProfileData,
}