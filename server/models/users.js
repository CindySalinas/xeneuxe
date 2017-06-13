
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passwordHash = require('bcrypt-nodejs');
const moment = require('moment');

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, sparse: true, required: true },
  password: { type: String, required: true },
  birthDate: { type: String },
  accountNumber: { type: String },
  isActivated: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  membershipType: {
    type: String,
    enum: ['bronze', 'silver', 'gold'],
    required: true
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, {
  toObject: {
    virtuals: true
  },
  versionKey: false
});

// generating a hash
userSchema.methods.generateHash = (password) => {
  return passwordHash.hashSync(password, passwordHash.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  try{
    return passwordHash.compareSync(password, this.password );
  }
  catch(e){
    return false;
  }
};

userSchema
  .virtual('age')
  .get(() => {
    let age = null;
    if (this.birthDate)
      age = Math.floor(moment(new Date()).diff(moment(this.birthDate, 'YYYY-MM-DD'), 'years', true));
    return age;
  });

module.exports = mongoose.passer ?
  mongoose.passer.model('User', userSchema) :
  mongoose.model('User', userSchema);
