var mongoose = require('mongoose');
const MongoURL =process.env.MONGO_DB_URL || "mongodb://localhost/registration";
mongoose.connect(MongoURL, {
  useMongoClient: true
});
exports.storeRegNum = mongoose.model('storeRegNum', {
  regNum: String
 });
