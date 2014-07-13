'use strict';

var pathToImages = './img';

module.exports = function () {
    return {
        host: '',
        port: 81,
        pathToApp: '\\app',

        environments: [
            {
                name: 'stl-qa-oalmt1',
                jobName: 'QA_RLM_AUTOCONFIG_stl-qa-oalmt1__MAIN'
            },
            {
                name: 'stl-qa-oalmt2',
                jobName: 'QA_RLM_AUTOCONFIG_stl-qa-oalmt2__MAIN'
            },
            {
                name: 'stl-qa-oalmt3',
                jobName: 'QA_RLM_AUTOCONFIG_stl-qa-oalmt3__MAIN'
            },
            {
                name: 'stl-alms-tst4',
                jobName: 'QA_RLM_AUTOCONFIG_stl-alms-tst4__MAIN'
            },
            {
                name: 'stl-alms-tst7',
                jobName: 'QA_RLM_AUTOCONFIG_stl-alms-tst7__MAIN'
            }
        ],

        jenkinsUrl: 'http://stl-qa-oalmsl:8080',
        statusGreen: pathToImages + '/green.png',
        statusRed: pathToImages + '/red.png',
        statusError: pathToImages + '/error.png',
        statusGrey: pathToImages + '/grey.png',
        statusAnime: pathToImages + '/blue_anime.gif'
    };
};
