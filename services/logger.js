"use strict";
const log = require('winston');
const response = require('../response');

module.exports = log;
module.exports.errorHandler = function(err, req, res, next){ // jshint ignore:line
	response(req, res, next);
	log.error(err);
	if(err.statusCode === 404){
		res.notFound(err);
	}else if(err.statusCode === 401){
		res.unauthorized(err);
	}else if(err.statusCode === 400){
		res.badRequest(err);
	}else if(err.statusCode === 503){
		res.forbidden(err);
	}else{
		res.serverError(err);
	}
};