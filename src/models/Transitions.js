'use strict';

var mongoose = require('mongoose');

var transitionsSchema = mongoose.Schema({
    environmentStatus: mongoose.Schema.Types.ObjectId,
    resolved: Boolean,
    locked: Boolean,
    changedBy: mongoose.Schema.Types.ObjectId,
    previousTransition: mongoose.Schema.Types.ObjectId
});

transitionsSchema.statics.cleanUp = function () {
    this.find().sort({
        '_id': -1
    }).skip(100).exec(function (err, docs) {
        log.info('Transitions to cleanup: ' + docs.length);
        docs.forEach(function (doc) {
            doc.remove();
        });
    });
};

module.exports = mongoose.model('Transitions', transitionsSchema);
