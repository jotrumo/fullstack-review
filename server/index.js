const express = require('express');
const bodyParser = require('body-parser');
const getRepos = require('../helpers/github.js');
const db = require('../database/index.js');
const app = express();
const PORT = process.env.PORT || 1128;

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/user', (req, res) => {
  getRepos.getReposByUsername(req.body.term, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      db.save(data, (err, data) => {
        if (err) {
          res.send(err)
        } else {
          db.getTop25((err, data) => {
            if (err) {
              res.send(err)
            } else {
              res.json(data)
            }
          })
        }
      });
    }
  })
})

app.get('/repos', function (req, res) {

  db.getTop25((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.json(data)
    }
  })
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

