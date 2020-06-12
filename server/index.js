const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});



app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

