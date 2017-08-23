var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const MongoURL =process.env.MONGO_DB_URL || "mongodb://localhost/registration";
mongoose.connect(MongoURL, {
  useMongoClient: true
});


exports.storeRegNum = mongoose.model('storeRegNum', {
  regNum: String
 });
