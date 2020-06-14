const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fetcher', { useNewUrLParser: true, useUnifiedTopology: true });
// const Promise = require('bluebird');
// Promise.promisifyAll(require('mongoose'));

//Connection authentication
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log('database is connected')
})

//Table schema
let repoSchema = new mongoose.Schema({
  // TODO: your schema here! Need to research API...
  name: String,
  repo: { type: String, unique: true },
  stars: Number
});

let Repo = mongoose.model('Repo', repoSchema);

//Models
let save = (dataArray, callback) => {
 // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var collection = [];

  dataArray.data.forEach(function(repo) {
    var newUser = new Repo({
      name: repo.owner.login,
      repo: repo.html_url,
      stars: repo.stargazers_count
    })
    collection.push(newUser);
  })
  // console.log("TEST2", collection);

  Repo.insertMany(collection)
  .then((res) => {
    callback(null, res)
  })
  .catch((err) => {
    callback(err, null)
  })
}

let getTop25 = (callback) => {

  Repo.find()
  .limit(25)
  .sort({ stars: 'descending'})
  .exec((err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
}


module.exports.save = save;
module.exports.getTop25 = getTop25;