'use-strict';

var querystring = require('querystring');
var request = require('request');

var Client = function(account, username, token) {
  this.beanstalkUrl = 'https://' + account + '.beanstalkapp.com';
  this.authHeader = "Basic " + new Buffer(username + ":" + token).toString("base64");

  return this;
};

Client.prototype.get = function(path, cb) {

  request({
      url: this.beanstalkUrl + path,
      headers: {
        'Authorization': this.authHeader,
        'Content-Type': 'application/json',
        'User-Agent': 'Node.js Beanstalk Wrapper'
      }
    }, 
    function (error, response, body) {
      cb(body);
    }
  );

};

Client.prototype.getRepositories = function(cb) {

  this.get('/api/repositories.json', function(data) {
    cb(data);
  });

};

module.exports.createClient = function(account, username, token) {
  return new Client(account, username, token);
};