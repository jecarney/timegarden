const jwt = require("jsonwebtoken");
const config = require("./config.json");

const create = user => {
  const { _id } = user;
  const payload = {
    user: {
      id: _id
    }
  };
  return jwt.sign(payload, config.secret); //creates a json web token. the first argument is the payload - payload will be the mongo ID
  //then the secret is an application-specific string that will be used almost like the salt
  //the secret doesn't really get stored here... if we published it on github someone could decode our token. We need it somewhere that won't be in version control. it's in config.json, which is in gitignore.
};

module.exports = {
  create
};
