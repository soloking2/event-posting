const moongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = moongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = moongoose.model('User', userSchema);
