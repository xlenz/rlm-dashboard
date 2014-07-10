'use strict';

var pathToImages = '/static/977f678d/images/32x32';

module.exports = function () {
    return {
        host: '',
        port: 81,

        jenkinsUrl: 'http://stl-qa-oalmsl:8080',
        jobPreffix: 'QA_RLM_AUTOCONFIG_',
        jobSuffix: '__MAIN',
        statusGreen: pathToImages + '/blue.png',
        statusRed: pathToImages + '/red.png',
        statusError: pathToImages + '/error.png',
        /*statusGrey: pathToImages + '/grey.png',*/
        statusGreyAnime: pathToImages + '/grey_anime.gif'
    };
};
