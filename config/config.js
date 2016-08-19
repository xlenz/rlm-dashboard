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
                sbmType: 'SSL',
                os: 'Server 2012 R2 SE x64',
                protocol: 'https',
                arPort: '8243',
                aePort: '443',
                sol: {
                    installType: 'Upgrade',
                    upgrade: '6.0.1'
                },
                database: {
                    hostname: 'stl-qa-oalmt1db',
                    type: 'Oracle 11.2.0.3'
                }
            },
            'QA_RLM_AUTOCONFIG_stl-qa-oalmt2__MAIN': {
                name: 'stl-qa-oalmt2',
                sbmType: 'SSL',
                os: 'Server 2008 R2 EE SP1 x64',
                protocol: 'https',
                arPort: '8243',
                aePort: '443',
                sol: {
                    installType: 'Upgrade',
                    upgrade: '6.0'
                },
                database: {
                    hostname: 'stl-qa-oalmtfs',
                    type: 'Oracle 11.2.0.3',
                }
            },
            'QA_RLM_AUTOCONFIG_stl-qa-oalmt3__MAIN': {
                name: 'stl-qa-oalmt3',
                sbmType: 'SSO off',
                os: 'Server 2012 SE x64',
                sol: {
                    installType: 'Clean',
                    upgrade: null
                },
                database: {
                    hostname: 'STMSQADV-T3DB01',
                    type: 'MSSQL 2014 SP1'
                }
            },
            'QA_RLM_AUTOCONFIG_stl-alms-tst4__MAIN': {
                name: 'stl-alms-tst4',
                sbmType: 'SSL',
                os: 'Server 2008 R2 SE SP1 x64',
                protocol: 'https',
                arPort: '8243',
                aePort: '443',
                sol: {
                    installType: 'Upgrade',
                    upgrade: '6.0'
                },
                database: {
                    hostname: 'stl-alms-tst4db',
                    type: 'MSSQL 2012 SP1'
                }
            },
            'QA_RLM_AUTOCONFIG_stl-alms-tst7__MAIN': {
                name: 'stl-alms-tst7',
                sbmType: 'no SSL',
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
            'QA_RLM_AUTOCONFIG_stmsqadv-tdb801__MAIN': {
                name: 'stmsqadv-tdb801',
                sbmType: 'SSL',
                os: 'Server 2008 R2 EE SP1 x64',
                protocol: 'https',
                arPort: '8443',
                aePort: '443',
                sol: {
                    installType: 'Upgrade',
                    upgrade: '6.0.1'
                },
                database: {
                    hostname: 'stmsqadv-tdb802',
                    type: 'MSSQL 2012 SP1'
                }
            },

// === SSM ===

            'QA_SSM_AUTOCONFIG_stl-qa-oalmt1__MAIN': {
                name: 'stl-qa-oalmt1',
                sbmType: 'On Premise',
                os: 'Server 2012 R2 SE x64',              
                sol: {
                    installType: 'Upgrade',
                    upgrade: '5.2.1'
                },
                database: {
                    hostname: 'stl-qa-oalmt1db',
                    type: 'Oracle 12.1.0.2'
                }
            },	
            'QA_SSM_AUTOCONFIG_stl-qa-oalmt2__MAIN': {
                name: 'stl-qa-oalmt2',
                sbmType: 'On Premise, SSL',
                os: 'Server 2008 R2 EE SP1 x64',
                protocol: 'https',
                arPort: '8243',
                aePort: '443',
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
                    upgrade: '5.2'
                },
                database: {
                    hostname: 'STMSQADV-T3DB01',
                    type: 'MSSQL 2014 SP1'
                }
            },
            'QA_SSM_AUTOCONFIG_stl-alms-tst4__MAIN': {
                sbmType: 'SSL',
                protocol: 'https',
                arPort: '8243',
                aePort: '443',
                name: 'stl-alms-tst4',
                sbmType: 'On Demand, SSL',
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
                    upgrade: '5.2.1'
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
            akolomakin: 'Andriyko Kolomakin',
            olazarenko: 'Olka Lazarenko',
            ytymchenko: 'Yulka Tymchenko',
            vmedvedev: 'Vadym Medvedev',
            ydmytriev: 'Yuri Dmytriev',
            //SRA
            kabbyasov: 'Kostya Abbyasov',
            drozenberg: 'Dimka Rozenberg',
            mcherkasskiy: 'Max Cherkasskiy'
        }
    };
};
