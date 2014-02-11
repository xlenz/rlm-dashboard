'use strict';

var fs = require('fs');

var configName = 'config/config.json';

exports.config = JSON.parse(fs.readFileSync(configName));

fs.watchFile(configName, function (current, previous) {
  log.info('Config file changed, server restart may be required.');
  fs.readFile(configName, function (err, data) {
    if (err) throw err;
    exports.config = JSON.parse(data);
  });
});
