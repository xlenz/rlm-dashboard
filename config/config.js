'use strict';

var pathToImages = 'img';
var pathToApp = 'app';

module.exports = function () {
    return {
        host: '',
        port: 80,

        pathToApp: pathToApp,
        appHtml: pathToApp + '/app.html',
        pageNotFound: pathToApp + '/404.html',

        environments: {

// === RLM ===

            'QA_RLM_AUTOCONFIG_stl-qa-oalmt1__MAIN': {
                name: 'stl-qa-oalmt1',
                sbmType: 'On Premise',
                os: 'Server 2003 R2 EE SP2 x86',
                sol: {
                    installType: 'Clean',
                    upgrade: null
                },
                database: {
                    hostname: 'stl-qa-oalmt1db',
                    type: 'Oracle 11.2.0.3'
                }
            },
            'QA_RLM_AUTOCONFIG_stl-qa-oalmt2__MAIN': {
                name: 'stl-qa-oalmt2',
                sbmType: 'On Premise',
                os: 'Server 2008 R2 EE SP1 x64',
                sol: {
                    installType: 'Upgrade',
                    upgrade: '5.0.1->5.1.1'
                },
                database: {
                    hostname: 'stl-qa-oalmtfs',
                    type: 'Oracle 11.2.0.3',
                }
            },
            'QA_RLM_AUTOCONFIG_stl-qa-oalmt3__MAIN': {
                name: 'stl-qa-oalmt3',
                sbmType: 'On Premise, SSO off',
                os: 'Server 2012 SE x64',
                sol: {
                    installType: 'Clean',
                    upgrade: null
                },
                database: {
                    hostname: 'STMSQADV-T3DB01',
                    type: 'MSSQL 2008 SP3'
                }
            },
            'QA_RLM_AUTOCONFIG_stl-alms-tst4__MAIN': {
                name: 'stl-alms-tst4',
                sbmType: 'On Premise',
                os: 'Server 2008 R2 SE SP1 x64',
                sol: {
                    installType: 'Clean',
                    upgrade: null
                },
                database: {
                    hostname: 'stl-alms-tst4db',
                    type: 'MSSQL 2012 SP1'
                }
            },

            // commented this one to avoid confusions...

            // 'QA_RLM_AUTOCONFIG_stl-alms-tst4-OnDemand__MAIN': {
            //     name: 'stl-alms-tst4',
            //     sbmType: 'On Demand',
            //     os: 'Server 2008 R2 SE SP1 x64',
            //     sol: {
            //         installType: 'Clean',
            //         upgrade: null
            //     },
            //     database: {
            //         hostname: 'stl-alms-tst4db',
            //         type: 'MSSQL 2012 SP1'
            //     }
            // },

            'QA_RLM_AUTOCONFIG_stmsqadv-tdb801__MAIN': {
                name: 'stmsqadv-tdb801',
                sbmType: 'On Demand',
                os: 'Server 2008 R2 EE SP1 x64',
                sol: {
                    installType: 'Upgrade',
                    upgrade: '5.1.1'
                },
                database: {
                    hostname: 'stmsqadv-tdb802',
                    type: 'MSSQL 2012 SP1'
                }
            },

// === SSM ===

            'QA_SSM_AUTOCONFIG_stl-qa-oalmt2__MAIN': {
                name: 'stl-qa-oalmt2',
                sbmType: 'On Premise',
                os: 'Server 2008 R2 EE SP1 x64',
                sol: {
                    installType: 'Upgrade',
                    upgrade: '5.0.1->5.1.1->5.2'
                },
                database: {
                    hostname: 'stl-qa-oalmtfs',
                    type: 'Oracle 11.2.0.3',
                }
            },
            'QA_SSM_AUTOCONFIG_stl-qa-oalmt3__MAIN': {
                name: 'stl-qa-oalmt3',
                sbmType: 'On Premise, SSO off',
                os: 'Server 2012 SE x64',
                sol: {
                    installType: 'Upgrade',
                    upgrade: '4.5'
                },
                database: {
                    hostname: 'STMSQADV-T3DB01',
                    type: 'MSSQL 2014 SP1'
                }
            },
            'QA_SSM_AUTOCONFIG_stl-alms-tst4__MAIN': {
                name: 'stl-alms-tst4',
                sbmType: 'On Demand',
                os: 'Server 2008 R2 SE SP1 x64',
                sol: {
                    installType: 'Clean',
                    upgrade: null
                },
                database: {
                    hostname: 'stl-alms-tst4db',
                    type: 'MSSQL 2012 SP1'
                }
            },
            'QA_SSM_AUTOCONFIG_stl-alms-tst7__MAIN': {
                name: 'stl-alms-tst7',
                sbmType: 'On Premise, SSL',
                os: 'Server 2012 R2 SE x64',
                sol: {
                    installType: 'Clean',
                    upgrade: null
                },
                database: {
                    hostname: 'stl-alms-tst7db',
                    type: 'Oracle 12.1.0.1.0'
                }
            },
            'QA_SSM_AUTOCONFIG_stmsqadv-tdb801__MAIN': {
                name: 'stmsqadv-tdb801',
                sbmType: 'On Demand',
                os: 'Server 2008 R2 EE SP1 x64',
                sol: {
                    installType: 'Upgrade',
                    upgrade: '5.1.1'
                },
                database: {
                    hostname: 'stmsqadv-tdb802',
                    type: 'MSSQL 2012 SP1'
                }
            }
        },

        tabs: [
            {
                name: 'Dashboard',
                href: '#dashboard'
            }
        ],

        jenkinsUrl: 'http://stl-qa-oalmsl:8080',
        statusGreen: pathToImages + '/green.png',
        statusRed: pathToImages + '/red.png',
        statusError: pathToImages + '/error.png',
        statusGrey: pathToImages + '/grey.png',
        statusAnime: pathToImages + '/blue_anime.gif',

        //users that are allowed to signup
        users: {
            //SOL
            ispitkovskyi: 'Igor Spitkovskyi',
            omykhaliov: 'Oleksiy Mykhaliov',
            mgrybyk: 'Mykola Grybyk',
            akolomakin: 'Andrii Kolomakin',
            //newcomer2: 'newcomer2',
            ytymchenko: 'Yulia Tymchenko',
            vmedvedev: 'Vadym Medvedev',
            ydmytriev: 'Yuri Dmytriev',
            //SRA
            kabbyasov: 'Kostya Abbyasov',
            drozenberg: 'Dimka Rozenberg',
            mcherkasskiy: 'Max Cherkasskiy'
        }
    };
};
