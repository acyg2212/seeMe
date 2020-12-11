let { MongoClient } = require("mongodb")

exports.User = MongoClient.model('User', require('./UserSchema'));