'use strict';

var mongoose = require('mongoose');

var transitionsSchema = mongoose.Schema({
    environmentStatus: mongoose.Schema.Types.ObjectId,
    resolved: Boolean,
    locked: Boolean,
    changedBy: mongoose.Schema.Types.ObjectId,
    previousTransition: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Transitions', transitionsSchema);
