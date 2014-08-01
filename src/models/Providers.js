'use strict';

var mongoose = require('mongoose');

var providerSchema = mongoose.Schema({
    name: String
});

providerSchema.statics.getProviderId = function (name, cb) {
    this.findOne({
        name: name
    }, function (err, result) {
        if (err) {
            return log.error(err);
        }
        cb(result === null ? null : result._id);
    });
};

var Provider = mongoose.model('Providers', providerSchema);

//init providers
Provider.getProviderId('local', function (result) {
    if (result === null) {
        var provider = new Provider({name: 'local'});
        provider.save(function (err, saved) {
            if (err) {
                return log.error(err);
            }
        });
    }
});

module.exports = Provider;
