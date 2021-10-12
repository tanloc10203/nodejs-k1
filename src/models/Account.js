const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/DataBase-MongoDB');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  username: String,
  password: String
}, {
  collection: 'Account'
});

const AccountModel = mongoose.model('Account', accountSchema);

module.exports = AccountModel;
