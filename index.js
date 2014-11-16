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
      },
      qs: params
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
 * See: http://api.beanstalkapp.com/user.html
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
 * Public Key Resource
 * See: http://api.beanstalkapp.com/public_key.html
 */

/**
 * Find All Public Keys
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getPublicKeys = function(callback) {
  this.get('/api/public_keys.json', null, callback);
};

/**
 * Find All Public Keys Owned by a Specific User
 * @param  {Integer}  userId  User ID
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getPublicKeysByUser = function(userId, callback) {
  this.get('/api/public_keys.json', { 'user_id': userId }, callback);
};

/**
 * Find All Public Keys Owned by a Specific User
 * @param  {Integer}  keyId  Public Key ID
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getPublicKey = function(keyId, callback) {
  this.get('/api/public_keys/' + keyId + '.json', null, callback);
};

/**
 * FeedKey Resource
 * See: http://api.beanstalkapp.com/feed_key.html
 */

/**
 * Find FeedKey for Current User
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getFeedKey = function(callback) {
  this.get('/api/feed_key.json', null, callback);
};


/** 
 * Repository Resource
 * See: http://api.beanstalkapp.com/repository.html
 */

/**
 * Find All Repositories
 * @param  {Object} [params] Find params (optional)
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getRepositories = function(params, callback) {
  if(typeof params === 'function') {
    callback = params;
    params = null;
  }
  this.get('/api/repositories.json', params, callback);
};

/**
 * Find Repository
 * @param  {Object} repositoryId  Repository ID
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getRepository = function(repositoryId, callback) {
  this.get('/api/repositories/' + repositoryId + '.json', null, callback);
};

/**
 * Find Branches
 * @param  {Object} repositoryId  Repository ID
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getBranches = function(repositoryId, callback) {
  this.get('/api/repositories/' + repositoryId + '/branches.json', null, callback);
};

/**
 * Find Tags
 * @param  {Object} repositoryId  Repository ID
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getTags = function(repositoryId, callback) {
  this.get('/api/repositories/' + repositoryId + '/tags.json', null, callback);
};


/**
 * Repository Import Resource
 * See: http://api.beanstalkapp.com/repository_import.html
 */

/**
 * Find All Repository Imports
 * @param  {Object} [params] Find params (optional)
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getRepositoryImports = function(callback) {
  this.get('/api/repository_imports.json', null, callback);
};

/**
 * Find Repository Import
 * @param  {Object} repositoryImportId  Repository Import ID
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getRepositoryImport = function(repositoryImportId, callback) {
  this.get('/api/repository_imports/' + repositoryImportId + '.json', null, callback);
};


/**
 * Permission Resource
 * See: Permission Resource
 */

/**
 * Find Permissions
 * @param  {Object} userId  User ID
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.getPermissions = function(userId, callback) {
  this.get('/api/permissions/' + userId + '.json', null, callback);
};
