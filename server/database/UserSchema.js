const passport = require("passport");

let { MongoClient } = require("mongodb"),
    bcrypt = require('bcrypt'),
    shortid = require('shortid'),
    Schema = MongoClient.Schema;

let UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    stream_key: String
});

UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateStreamKey = () => {
    return shortid.generate();
};

module.exports = UserSchema;