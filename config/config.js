'use strict';

var pathToImages = './img';

module.exports = function () {
    return {
        host: '',
        port: 81,
        pathToApp: '\\app',

        environments: [
            {
                name: 'stl-qa-oalmt1'
            },
            {
                name: 'stl-qa-oalmt2'
            },
            {
                name: 'stl-qa-oalmt3'
            },
            {
                name: 'stl-alms-tst4'
            },
            {
                name: 'stl-alms-tst7'
            }
        ],

        jenkinsUrl: 'http://stl-qa-oalmsl:8080',
        jobPreffix: 'QA_RLM_AUTOCONFIG_',
        jobSuffix: '__MAIN',
        statusGreen: pathToImages + '/green.png',
        statusRed: pathToImages + '/red.png',
        statusError: pathToImages + '/error.png',
        statusGrey: pathToImages + '/grey.png',
        statusAnime: pathToImages + '/blue_anime.gif'
    };
};
