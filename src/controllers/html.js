'use strict';

var self = this;
var cfg = null;

module.exports = function (_cfg) {
  cfg = _cfg;
  return self;
};

exports.rootHtml = function (req, res, next) {
  return res.redirect(cfg.root_html);
};
