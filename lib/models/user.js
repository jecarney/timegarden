const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: { type: String, unique: true, required: true }, // email is set to unique to prevent multiple signups with the same email
  password: { type: String, required: true }
});

userSchema.pre("save", function(next) {
  const user = this; //redundant, but putting it in there for readability
  if (user.isModified("password") || user.isNew) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      //the 10 is the number of "salt rounds", makes it harder to crack (but will be slower the higher it is)
      if (err) {
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
