'use strict';

var fs = require('fs');
var winston = require('winston');

if (!fs.existsSync('logs')) fs.mkdirSync('logs');

var logger = new(winston.Logger)({
  transports: [
    new(winston.transports.Console)({
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/debug.log',
      json: false,
      maxsize: 10,
      maxFiles: 2
    })
  ],
  exceptionHandlers: [
    new(winston.transports.Console)({
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/exceptions.log',
      json: false,
      maxsize: 10,
      maxFiles: 2
    })
  ],
  exitOnError: false
});

module.exports = logger;

if (!String.prototype.format) {
  String.prototype.format = function () {
    var str = this.toString();
    if (!arguments.length)
      return str;
    var argType = typeof arguments[0];
    var args = arguments;
    if ("string" != argType && "number" != argType) {
      args = arguments[0];
    }
    for (var arg in args)
      str = str.replace(new RegExp("\\{" + arg + "\\}", "gi"), args[arg]);
    return str;
  };
}
