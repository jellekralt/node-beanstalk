'use-strict';

/** Dependencies */
var querystring = require('querystring');
var request = require('request');

/**
 * Client
 * @param  {String} account  Beanstalk account name
 * @param  {String} username Username
 * @param  {String} token    Access token
 * @return {Client}          Returns itself
 */
var Client = function(account, username, token) {
  this.beanstalkUrl = 'https://' + account + '.beanstalkapp.com';
  this.authHeader = "Basic " + new Buffer(username + ":" + token).toString("base64");

  return this;
};

/**
 * Client constuctor
 * @param  {String} account  Beanstalk account name
 * @param  {String} username Username
 * @param  {String} token    Access token
 * @return {Client}          Returns a new instance of the Client object
 */
module.exports.createClient = function(account, username, token) {
  return new Client(account, username, token);
};

/**
 * Wrapper function for the GET requests
 * @param  {String}   path     Path to the resource
 * @param  {Object}   params   GET parameters
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.get = function(path, params, callback) {

  request({
      url: this.beanstalkUrl + path,
      headers: {
        'Authorization': this.authHeader,
        'Content-Type': 'application/json',
        'User-Agent': 'Node.js Beanstalk Wrapper'
      }
    }, 
    function (error, response, data) {
      callback(error, data);
    }
  );

};

/**
 * Gets all repositories 
 * See: http://api.beanstalkapp.com/repository.html
 * @param  {Object}   params   GET parameters
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getRepositories = function(callback) {
  this.get('/api/repositories.json', null, callback);
};