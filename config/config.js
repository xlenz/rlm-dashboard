'use strict';

var pathToImages = './img';
var pathToApp = 'app';

module.exports = function () {
    return {
        host: '',
        port: 80,

        pathToApp: pathToApp,
        appHtml: pathToApp + '/app.html',
        pageNotFound: pathToApp + '/404.html',

        rdpCred: {
            user: 'Administrator',
            pwd: 'password'
        },
        environments: {
            'QA_SSM_AUTOCONFIG_stl-qa-oalmt1__MAIN': {
                name: 'stl-qa-oalmt1',
                os: 'Server 2003 R2 Enterprise SP2 x86',
                sol: {
                    version: null,
                    installType: 'Clean',
                    upgrade: null
                },
                sbm: {
                    version: '10.1.4.1',
                    upgrade: null
                },
                // sra: {
                    // server: 'localhost',
                    // serverDetails: 'serena_ra/password',
                    // installedBy: 'SOO installer'
                // },
                database: {
                    hostname: 'stl-qa-oalmt1db',
                    type: 'Oracle 11.2.0.3',
                    credentials: [
                        'system/manager@oalm',
                        'sbm1/manager@oalm'
                    ]
                },
                iis: '6.0'
            },
            'QA_SSM_AUTOCONFIG_stl-qa-oalmt2__MAIN': {
                name: 'stl-qa-oalmt2',
                os: 'Server 2008 R2 Enterprise SP1 x64',
                sol: {
                    version: null,
                    installType: 'Clean',
                    upgrade: null
                },
                sbm: {
                    version: '10.1.4.1',
                    upgrade: null
                },
                // sra: {
                    // server: 'stl-alms-tst6',
                    // serverDetails: 'Tomcat',
                    // installedBy: 'CI of SRA'
                // },
                database: {
                    hostname: 'stl-qa-oalmtfs',
                    type: 'Oracle 11.2.0.3',
                    credentials: [
                        'system/manager@oalm',
                        'sbm2/manager@oalm'
                    ]
                },
                iis: '7.5'
            },
            'QA_SSM_AUTOCONFIG_stl-qa-oalmt3__MAIN': {
                name: 'stl-qa-oalmt3',
                os: 'Server 2012 Standard x64',
                sol: {
                    version: null,
                    installType: 'Clean',
                    upgrade: null
                },
                sbm: {
                    version: '10.1.4.1',
                    upgrade: null
                },
                // sra: {
                    // server: 'stl-alms-tst5',
                    // serverDetails: 'Tomcat',
                    // installedBy: 'CI of SRA'
                // },
                database: {
                    hostname: 'localhost',
                    type: 'MSSQL 2008 R2 SP2',
                    credentials: [
                        'sa/manager'
                    ]
                },
                iis: '8.0'
            },
            'QA_SSM_AUTOCONFIG_stl-alms-tst4__MAIN': {
                name: 'stl-alms-tst4',
                os: 'Server 2008 R2 Standard SP1 x64',
                sol: {
                    version: null,
                    installType: 'Clean',
                    upgrade: null
                },
                sbm: {
                    version: '10.1.4.1',
                    upgrade: null
                },
                // sra: {
                    // server: 'localhost',
                    // serverDetails: 'serena_ra/password',
                    // installedBy: 'SOO installer'
                // },
                database: {
                    hostname: 'stl-alms-tst4db',
                    type: 'MSSQL 2012 SP1',
                    credentials: [
                        'sa/manager'
                    ]
                },
                iis: '7.5'
            },
            'QA_SSM_AUTOCONFIG_stl-alms-tst7__MAIN': {
                name: 'stl-alms-tst7',
                os: 'Server 2012 R2 Standard x64',
                sol: {
                    version: null,
                    installType: 'Clean',
                    upgrade: null
                },
                sbm: {
                    version: '10.1.4.1',
                    upgrade: null
                },
                // sra: {
                    // server: 'localhost',
                    // serverDetails: 'serena_ra/password',
                    // installedBy: 'SOO installer'
                // },
                database: {
                    hostname: 'localhost',
                    type: 'MSSQL 2008 R2 SP2',
                    credentials: [
                        'sa/manager'
                    ]
                },
                iis: '8.5'
            }
        },

        tabs: [
            {
                name: 'Dashboard',
                href: '#dashboard'
            },
            {
                name: 'Test Environments',
                href: '#envs'
            },
            {
                name: '3rd Party Integrations',
                href: '#integrations'
            },
            {
                name: 'Automation',
                href: '#automation'
            },
            {
                name: 'Dimensions Client',
                subsection: true,
                href: '#dmcm'
            },
            {
                name: 'Excel Addin',
                subsection: true,
                href: '#exceladdin'
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
            //RLM
            ispitkovskyi: 'Igor Spitkovskyi',
            omykhaliov: 'Oleksiy Mykhaliov',
            vnesterenko: 'Vika Nesterenko',
            mgrybyk: 'Mykola Grybyk',
            nlugova: 'Nata Lugova',
            //SRA
            kabbyasov: 'Kostya Abbyasov',
            drozenberg: 'Dimka Rozenberg',
            mcherkasskiy: 'Max Cherkasskiy'
        }
    };
};
