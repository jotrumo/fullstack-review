const axios = require('axios');
const config = require('../config.js');
const db = require('../database/index.js')

let getReposByUsername = (userName, callback) => {

  let options = {
    url: 'https://api.github.com',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios.get(`${options.url}/users/${userName}/repos`, options)
  .then((response) => {
    callback(null, response);
  })
  .catch((err) => {
    callback(err, null)
  })
}

module.exports.getReposByUsername = getReposByUsername;