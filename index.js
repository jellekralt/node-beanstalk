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
 * Account functions
 * See: http://api.beanstalkapp.com/account.html
 */

/**
 * Gets the Beanstalk account data
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getAccount = function(callback) {
  this.get('/api/account.json', null, callback);
};


/** 
 * Plan functions
 * See: http://api.beanstalkapp.com/plan.html
 */

/**
 * Gets all plans
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getPlans = function(callback) {
  this.get('/api/plans.json', null, callback);
};


/** 
 * User functions
 * http://api.beanstalkapp.com/user.html
 */

/**
 * Gets all users
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getUsers = function(callback) {
  this.get('/api/users.json', null, callback);
};

/**
 * Gets a user
 * @param  {Integer}  userId  User ID
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getUser = function(userId, callback) {
  this.get('/api/users/' + userId + '.json', null, callback);
};

/**
 * Gets the current user
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getCurrentUser = function(callback) {
  this.get('/api/users/current.json', null, callback);
};


/** 
 * Repository functions
 * See: http://api.beanstalkapp.com/repository.html
 */

/**
 * Gets all repositories 
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getRepositories = function(callback) {
  this.get('/api/repositories.json', null, callback);
};
