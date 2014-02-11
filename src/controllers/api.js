'use strict';

var self = this;

module.exports = function () {
  return self;
};

//just a template :)

exports.notImplemented = function (req, res, next) {
  throw new Error('notImplemented');
};
